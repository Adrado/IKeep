using IKeep.Lib.Core;
using IKeep.Lib.DA.EFCore;
using IKeep.Lib.Models;
using IKeep.Lib.Services.Dtos;
using IKeep.Lib.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using EFCore.BulkExtensions;

namespace IKeep.Lib.Server.Services
{
    public class ChoreService : IChoreService
    {
        
        private readonly ICrudService<Chore> _choresService;
        private readonly IGetElementsService _getElementsService;
        private readonly IFormatService _formatsService;
        private readonly ICrudService<Installation> _installationsService;
        private readonly IKeepContext _context;

        public ChoreService(IGetElementsService getElementsService,
                            ICrudService<Chore> choresService,
                            IFormatService formatsService,
                            ICrudService<Installation> installationsService,
                            IKeepContext context)
        {
            _choresService = choresService;
            _getElementsService = getElementsService;
            _formatsService = formatsService;
            _installationsService = installationsService;
            _context = context;
        }

        public NewChoresResponse ChoresResponse { get; set; }

        public IQueryable<Chore> GetAll()
        {
            return _choresService.GetAll();
        }
        
        public NewChoresResponse AddChores(NewChoresRequest newChoresRequest)
        {
            ChoresResponse = new NewChoresResponse();

            IEnumerable<Element> elements;

            ChoresResponse.StartRequest = DateTime.Now;
            ChoresResponse.TotalChores = 0;
            List<InstallationResponse> InstallationsCompleted = new List<InstallationResponse>();

            int AllElements = 0;

            if(newChoresRequest.AllInstallations == true)
            {
                IEnumerable<Installation> installationsActive = _getElementsService.GetAllActiveInstallations();
                foreach(Installation Installation in installationsActive)
                {
                    elements = _getElementsService.GetInstallationElements(Installation.Id);
                    InstallationResponse installationResponse = AddChoreToElements(elements, newChoresRequest.Year);
                    installationResponse.InstallationName = Installation.Name;

                    InstallationsCompleted.Add(installationResponse);
                    AllElements = AllElements + installationResponse.ElementsNumber;
                }
            }
            else
            {
                elements = GetElements(newChoresRequest);
                InstallationResponse installationResponse = AddChoreToElements(elements, newChoresRequest.Year);
                installationResponse.InstallationName = _installationsService.GetAll().FirstOrDefault(x => x.Id == newChoresRequest.InstallationId).Name;
                InstallationsCompleted.Add(installationResponse);
                AllElements = AllElements + installationResponse.ElementsNumber;
                ChoresResponse.TotalChores += installationResponse.TotalChores;
            }

            ChoresResponse.EndRequest = DateTime.Now;
            ChoresResponse.Installations = InstallationsCompleted;
            ChoresResponse.TotalElements = AllElements;

            return ChoresResponse;
        }

        private IEnumerable<Element> GetElements(NewChoresRequest newChoresRequest)
        {
            IEnumerable<Element> elements = new List<Element>();

            if (newChoresRequest.InstallationId != null)
                elements = _getElementsService.GetInstallationElements(newChoresRequest.InstallationId);
            else if (newChoresRequest.BuildingId != null)
                elements = _getElementsService.GetBuildingElements(newChoresRequest.BuildingId);
            else if (newChoresRequest.FloorId != null)
                elements = _getElementsService.GetFloorElements(newChoresRequest.FloorId);
            else if (newChoresRequest.AreaId != null)
                elements = _getElementsService.GetAreaElements(newChoresRequest.AreaId);

            return elements;
        }
       

        private InstallationResponse AddChoreToElements(IEnumerable<Element> elements, int year)
        {
            InstallationResponse InstallationResponse = new InstallationResponse();
            InstallationResponse.TotalChores = 0;
            InstallationResponse.Elements = new List<ElementResponse>();

            foreach (Element element in elements)
            {
                ElementResponse elementResponse = AddElementChores(element, year);
                elementResponse.ElementRef = element.Ref;

                InstallationResponse.Elements.Add(elementResponse);
                InstallationResponse.TotalChores += elementResponse.TotalChores;
            }

            return InstallationResponse;
        }

        private ElementResponse AddElementChores(Element element, int year)
        {
            var elementGenericChores = element.ElementGenericChores;

            ElementResponse ElementResponse = new ElementResponse();
            ElementResponse.Chores = new List<ChoreResponse>();
            ElementResponse.TotalChores = 0;

            List<Chore> AllChoresElement = new List<Chore>();


            foreach (ElementGenericChore elemenGChore in elementGenericChores)
            {
                NewChoresGuideline newChoresGuideline = new NewChoresGuideline();
                newChoresGuideline.GenericChore = elemenGChore.GenericChore;
                newChoresGuideline.ElementId = element.Id;

                GenericChore gChore = elemenGChore.GenericChore;
                Period gChorePeriod = gChore.Period;

                Chore LastChore = GetLastChore(element.Id, gChore.Id, year);

                if (LastChore == null)
                    newChoresGuideline.TimeSpanToAddChores = GetDefaultTimeSpan(year);
                else if (IsTimeSpanIncomplete(LastChore, year) == true)
                    newChoresGuideline.TimeSpanToAddChores = ResumeTimeSpan(LastChore);
                else
                    continue;

                List<Chore> choresAdded = AddingElements(newChoresGuideline);

                AllChoresElement.AddRange(choresAdded);

                ChoreResponse choreResponse = new ChoreResponse();
                choreResponse.TotalChores = choresAdded.Count();
                choreResponse.Period = newChoresGuideline.GenericChore.Period;

                ElementResponse.Chores.Add(choreResponse);
                ElementResponse.TotalChores += choreResponse.TotalChores;
            }

            InsertChoresToDatabase(AllChoresElement);
            _formatsService.AddFormatValuesToChores(AllChoresElement);

            return ElementResponse;
        }

        private bool IsTimeSpanIncomplete(Chore chore, int year)
        {
            DateTime LastDayOfYear = new DateTime(year, 12, 31);
            return DateTime.Compare(chore.EndDate, LastDayOfYear) < 0 ? true : false;
        }

        private Chore GetLastChore(Guid elementId, Guid gChoreId, int year)
        {
            Chore lastChore = _choresService.GetAll()
            .Where(c => c.GenericChoreId == gChoreId && c.ElementId == elementId && c.StartDate.Year == year)
            .OrderByDescending(c => c.StartDate)
            .FirstOrDefault();

            return lastChore;
        }

        private TimeSpanToAddChores GetDefaultTimeSpan(int year)
        {
            TimeSpanToAddChores timeSpanToAddChores = new TimeSpanToAddChores
            {
                Start = new DateTime(year, 1, 1, 0, 0, 0),
                End = new DateTime(year, 12, 31, 23, 59, 59),
            };

            return timeSpanToAddChores;
        }

        private TimeSpanToAddChores ResumeTimeSpan(Chore lastChore)
        {
            TimeSpanToAddChores timeSpanToAddChores = new TimeSpanToAddChores
            {
                Start = new DateTime(lastChore.StartDate.Year, lastChore.StartDate.Month, lastChore.StartDate.Day).AddDays(1),
                End = new DateTime(lastChore.StartDate.Year, 12, 31, 23, 59, 59),
            };
          
            return timeSpanToAddChores;
        }

        private List<Chore> AddingElements(NewChoresGuideline guideline)
        {
            Period period = guideline.GenericChore.Period;
            List<Chore> response = new List<Chore>();
         
            switch (period)
            {
                case Period.Daily:
                    response.AddRange(CreateDailyChoreList(guideline));
                    break;

                case Period.Weekly:
                    response.AddRange(CreateWeeklyChoreList(guideline));
                    break;

                case Period.Monthly:
                    response.AddRange(CreateMonthlyChoreList(guideline));
                    break;

                case Period.Bimonthly:
                    response.AddRange(CreateBimonthlyChoreList(guideline));
                    break;

                case Period.Quarterly:
                    response.AddRange(CreateQuarterlyChoreList(guideline));
                    break;

                case Period.Semester:
                    response.AddRange(CreateSemesterChoreList(guideline));
                    break;

                case Period.Yearly:
                    response.AddRange(CreateYearlyChoreList(guideline));
                    break;

                case Period.TwoYearly:
                    response.AddRange(CreateTwoYearlyChoreList(guideline));
                    break;

                case Period.FourYearly:
                    response.AddRange(CreateFourYearlyChoreList(guideline));
                    break;
            }
            return response;
        }


        private List<Chore> CreateDailyChoreList(NewChoresGuideline guideline)
        {
            DateTime endTimeSpan = guideline.TimeSpanToAddChores.End;
            DateTime startTimeSpan = guideline.TimeSpanToAddChores.Start;
            List<Chore> DailyChores = new List<Chore>();

            for (DateTime d = startTimeSpan; d <= endTimeSpan; d = d.AddDays(1))
            {
                DateTime choreStartDate = d;
                DateTime choreEndDate = new DateTime(d.Year, d.Month, d.Day, 23, 59, 59);

                Chore Chore = CreateChore(guideline, choreStartDate, choreEndDate);
                DailyChores.Add(Chore);
            }
            return DailyChores;
        }

        private List<Chore> CreateWeeklyChoreList(NewChoresGuideline guideline)
        {
            DateTime endTimeSpan = guideline.TimeSpanToAddChores.End;
            DateTime startTimeSpan = guideline.TimeSpanToAddChores.Start;
            DateTime dateFirstMonday = FirstMonday(startTimeSpan);
            List<Chore> WeeklyChores = new List<Chore>();


            for (DateTime d = dateFirstMonday; d <= endTimeSpan; d = d.AddDays(7))
            {
                DateTime choreStartDate = d;
                DateTime choreEndDate = GetLastDayOfWeek(d);

                Chore Chore = CreateChore(guideline, choreStartDate, choreEndDate);
                WeeklyChores.Add(Chore);
            }
            return WeeklyChores;
        }

        private DateTime FirstMonday(DateTime date)
        {
            int day = date.Day;

            while ((new DateTime(date.Year, date.Month, ++day)).DayOfWeek != DayOfWeek.Monday) ;
            return new DateTime(date.Year, date.Month, day, 0, 0, 0);
        }

        private DateTime GetLastDayOfWeek(DateTime date)
        {
            DateTime EndWeek = date.AddDays(6);
            return new DateTime(EndWeek.Year, EndWeek.Month, EndWeek.Day, 23, 59, 59);
        }

        private List<Chore> CreateMonthlyChoreList(NewChoresGuideline guideline)
        {
            DateTime endTimeSpan = guideline.TimeSpanToAddChores.End;
            DateTime startTimeSpan = guideline.TimeSpanToAddChores.Start;
            DateTime firstDayOfTheMonth = GetFirstDayOfMonth(startTimeSpan);
            List<Chore> MonthlyChores = new List<Chore>();

            for (DateTime d = firstDayOfTheMonth; d <= endTimeSpan; d = d.AddMonths(1))
            {
                DateTime choreStartDate = d;
                DateTime choreEndDate = GetLastDayOfMonth(d);

                Chore Chore = CreateChore(guideline, choreStartDate, choreEndDate);
                MonthlyChores.Add(Chore);
            }
            return MonthlyChores;
        }

        private DateTime GetFirstDayOfMonth(DateTime date)
        {
            return date.Day == 1 ? date : new DateTime(date.Year, date.Month, 1, 0, 0, 0).AddMonths(1);
        }

        private DateTime GetLastDayOfMonth(DateTime date)
        {
            return new DateTime(date.Year, date.Month,
                                 DateTime.DaysInMonth(date.Year, date.Month),
                                 23, 59, 59);
        }

        private List<Chore> CreateBimonthlyChoreList(NewChoresGuideline guideline)
        {
            DateTime endTimeSpan = guideline.TimeSpanToAddChores.End;
            DateTime startTimeSpan = guideline.TimeSpanToAddChores.Start;
            DateTime firstDayOfBimonthly = GetFirstDayOfBimonthly(startTimeSpan);
            List<Chore> BimonthlyChores = new List<Chore>();

            for (DateTime d = firstDayOfBimonthly; d <= endTimeSpan; d = d.AddMonths(2))
            {
                DateTime choreStartDate = d;
                DateTime choreEndDate = GetLastDayOfBimonthly(d);

                Chore Chore = CreateChore(guideline, choreStartDate, choreEndDate);
                BimonthlyChores.Add(Chore);
            }
            return BimonthlyChores;
        }

        private DateTime GetFirstDayOfBimonthly(DateTime date)
        {
            for(DateTime d = new DateTime(date.Year, 1, 1, 0, 0, 0); d <= new DateTime(date.Year, 12, 1); d.AddMonths(2))
            {
                if (DateTime.Compare(date, d) == 0)
                    return date;
                else if(DateTime.Compare(date, d) > 0)
                    return d;
            }
            return date;
        }

        private DateTime GetLastDayOfBimonthly(DateTime date)
        {
            return new DateTime(date.Year, date.Month,
                                 DateTime.DaysInMonth(date.Year, date.Month),
                                 23, 59, 59).AddMonths(1);
        }

        private List<Chore> CreateQuarterlyChoreList(NewChoresGuideline guideline)
        {
            DateTime endTimeSpan = guideline.TimeSpanToAddChores.End;
            DateTime startTimeSpan = guideline.TimeSpanToAddChores.Start;
            DateTime firstDayOfQuarterly = GetFirstDayOfQuarterly(startTimeSpan);
            List<Chore> QuarterlyChores = new List<Chore>();

            for (DateTime d = firstDayOfQuarterly; d <= endTimeSpan; d = d.AddMonths(3))
            {
                DateTime choreStartDate = d;
                DateTime choreEndDate = GetLastDayOfQuarterly(d);

                Chore Chore = CreateChore(guideline, choreStartDate, choreEndDate);
                QuarterlyChores.Add(Chore);
            }
            return QuarterlyChores;
        }

        private DateTime GetFirstDayOfQuarterly(DateTime date)
        {
            for (DateTime d = new DateTime(date.Year, 1, 1, 0, 0, 0); d <= new DateTime(date.Year, 12, 1); d.AddMonths(3))
            {
                if (DateTime.Compare(date, d) == 0)
                    return date;
                else if (DateTime.Compare(date, d) > 0)
                    return d;
            }
            return date;
        }

        private DateTime GetLastDayOfQuarterly(DateTime date)
        {
            return new DateTime(date.Year, date.Month,
                                 DateTime.DaysInMonth(date.Year, date.Month),
                                 23, 59, 59).AddMonths(2);
        }

        private List<Chore> CreateSemesterChoreList(NewChoresGuideline guideline)
        {
            DateTime endTimeSpan = guideline.TimeSpanToAddChores.End;
            DateTime startTimeSpan = guideline.TimeSpanToAddChores.Start;
            DateTime firstDayOfSemester = GetFirstDayOfSemester(startTimeSpan);
            List<Chore> SemesterChores = new List<Chore>();

            for (DateTime d = firstDayOfSemester; d <= endTimeSpan; d = d.AddMonths(6))
            {
                DateTime choreStartDate = d;
                DateTime choreEndDate = GetLastDayOfSemester(d);

                Chore Chore = CreateChore(guideline, choreStartDate, choreEndDate);
                SemesterChores.Add(Chore);
            }
            return SemesterChores;
        }

        private DateTime GetFirstDayOfSemester(DateTime date)
        {
            for (DateTime d = new DateTime(date.Year, 1, 1, 0, 0, 0); d <= new DateTime(date.Year, 12, 1); d.AddMonths(6))
            {
                if (DateTime.Compare(date, d) == 0)
                    return date;
                else if (DateTime.Compare(date, d) > 0)
                    return d;
            }
            return date;
        }

        private DateTime GetLastDayOfSemester(DateTime date)
        {
            return new DateTime(date.Year, date.Month,
                                 DateTime.DaysInMonth(date.Year, date.Month),
                                 23, 59, 59).AddMonths(5);
        }

        private List<Chore> CreateYearlyChoreList(NewChoresGuideline guideline)
        {
            DateTime endTimeSpan = guideline.TimeSpanToAddChores.End;
            DateTime startTimeSpan = guideline.TimeSpanToAddChores.Start;
            DateTime firstDayOfYear = GetFirstDayOfYear(startTimeSpan);
            List<Chore> YearlyChores = new List<Chore>();

            for (DateTime d = firstDayOfYear; d <= endTimeSpan; d = d.AddYears(1))
            {
                DateTime choreStartDate = d;
                DateTime choreEndDate = GetLastDayOfYear(d);

                Chore Chore = CreateChore(guideline, choreStartDate, choreEndDate);
                YearlyChores.Add(Chore);
            }
            return YearlyChores;
        }
        private DateTime GetFirstDayOfYear(DateTime date)
        {
            return new DateTime(date.Year, 1, 1, 0, 0, 0);
        }
        private DateTime GetLastDayOfYear(DateTime date)
        {
            return new DateTime(date.Year, 12, 31, 23, 59, 59);
        }

        private List<Chore> CreateTwoYearlyChoreList(NewChoresGuideline guideline)
        {
            DateTime endTimeSpan = guideline.TimeSpanToAddChores.End;
            DateTime startTimeSpan = guideline.TimeSpanToAddChores.Start;
            DateTime firstDayOfTwoYearly = GetFirstDayOfTwoYearly(startTimeSpan);
            List<Chore> TwoYearlyChores = new List<Chore>();

            for (DateTime d = firstDayOfTwoYearly; d <= endTimeSpan; d = d.AddYears(2))
            {
                DateTime choreStartDate = d;
                DateTime choreEndDate = GetLastDayOfTwoYearly(d);

                Chore Chore = CreateChore(guideline, choreStartDate, choreEndDate);
                TwoYearlyChores.Add(Chore);
            }
            return TwoYearlyChores;
        }
        private DateTime GetFirstDayOfTwoYearly(DateTime date)
        {
            return new DateTime(date.Year, 1, 1, 0, 0, 0);
        }
        private DateTime GetLastDayOfTwoYearly(DateTime date)
        {
            return new DateTime(date.Year, 12, 31, 23, 59, 59).AddYears(1);
        }
        private List<Chore> CreateFourYearlyChoreList(NewChoresGuideline guideline)
        {
            DateTime endTimeSpan = guideline.TimeSpanToAddChores.End;
            DateTime startTimeSpan = guideline.TimeSpanToAddChores.Start;
            DateTime firstDayOfFourYearly = GetFirstDayOfFourYearly(startTimeSpan);
            List<Chore> FourYearlyChores = new List<Chore>();

            for (DateTime d = firstDayOfFourYearly; d <= endTimeSpan; d = d.AddYears(4))
            {
                DateTime choreStartDate = d;
                DateTime choreEndDate = GetLastDayOffourYearly(d);

                Chore Chore = CreateChore(guideline, choreStartDate, choreEndDate);
                FourYearlyChores.Add(Chore);
            }
            return FourYearlyChores;
        }
        private DateTime GetFirstDayOfFourYearly(DateTime date)
        {
            return new DateTime(date.Year, 1, 1, 0, 0, 0);
        }
        private DateTime GetLastDayOffourYearly(DateTime date)
        {
            return new DateTime(date.Year, 12, 31, 23, 59, 59).AddYears(3);
        }

        private Chore CreateChore(NewChoresGuideline guideline, DateTime startDate, DateTime endDate)
        {
            Chore Chore = new Chore()
            {
                Id = Guid.NewGuid(),
                EntityStatus = EntityStatus.Active,
                ElementId = guideline.ElementId,
                StartDate = startDate,
                EndDate = endDate,
                GenericChoreId = guideline.GenericChore.Id,
                Status = ChoreStatus.Undone,
                UserId = null,

            };
            return Chore;
        }

        private void InsertChoresToDatabase(List<Chore> chores)
        {
            _context.BulkInsert(chores);
        }
    }
}
