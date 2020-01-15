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

namespace IKeep.Lib.Server.Services
{
    public class ChoreService : IChoreService
    {
        
        private readonly ICrudService<Chore> _choresCrudService;
        private readonly IGetElementsService _getElementsService;
        private readonly IFormatService _formatService;

        public ChoreService(IGetElementsService getElementsService,
                            ICrudService<Chore> choreService,
                            IFormatService formatService)
        {
            _choresCrudService = choreService;
            _getElementsService = getElementsService;
            _formatService = formatService;
        }

        public IQueryable<Chore> GetAll()
        {
            return _choresCrudService.GetAll();
        }

        public NewChoresResponse AddChores(NewChoresRequest newChoresRequest)
        {
            NewChoresResponse response = new NewChoresResponse();
            response.TotalElements = 0;

            IEnumerable<Element> elements;

            if(newChoresRequest.AllInstallations == true)
            {
                IEnumerable<Installation> installationsActive = _getElementsService.GetAllActiveInstallations();
                foreach(Installation Installation in installationsActive)
                {
                    elements = _getElementsService.GetInstallationElements(Installation.Id);
                    response.TotalElements = response.TotalElements + AddChoreToElements(elements, newChoresRequest.Year);
                }
            }
            else
            {
                elements = GetElements(newChoresRequest);
                response.TotalElements = response.TotalElements + AddChoreToElements(elements, newChoresRequest.Year);
            }
            
            return response;
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
            foreach (Element element in elements)
            {
                ElementResponse ElementResponse = new ElementResponse();
                ElementResponse.NumChores = AddElementChores(element, year);
                ElementResponse.ElementRef = element.Ref;
                InstallationResponse.Elements.Add(ElementResponse);
            }
            return InstallationResponse;
        }

        private int AddElementChores(Element element, int year)
        {
            var elementGenericChores = element.ElementGenericChores;
            int totalChoresAdded = 0;
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

                int choresAdded = AddingElements(newChoresGuideline);
                totalChoresAdded = totalChoresAdded + choresAdded;
            }
            return totalChoresAdded;
        }

        private bool IsTimeSpanIncomplete(Chore chore, int year)
        {
            bool isIncomplete = false;

            Period period = chore.GenericChore.Period;

            DateTime start;
            DateTime end;

            switch (period)
            {
                case Period.Daily:
                    start = new DateTime(year, 12, 31);
                    isIncomplete = DateTime.Compare(chore.StartDate, start) < 0 ? true : false ;
                    break;

                case Period.Weekly:
                    end = new DateTime(year, 12, 31);
                    isIncomplete = DateTime.Compare(chore.EndDate, end) < 0 ? true : false;
                    break;

                case Period.Monthly:
                    start = new DateTime(year, 12, 1);
                    isIncomplete = DateTime.Compare(chore.StartDate, start) < 0 ? true : false;
                    break;

                case Period.Bimonthly:
                    end = new DateTime(year, 12, 31);
                    isIncomplete = DateTime.Compare(chore.EndDate, end) < 0 ? true : false;
                    break;

                case Period.Quarterly:
                    end = new DateTime(year, 12, 31);
                    isIncomplete = DateTime.Compare(chore.EndDate, end) < 0 ? true : false;
                    break;

                case Period.Semester:
                    end = new DateTime(year, 12, 31);
                    isIncomplete = DateTime.Compare(chore.EndDate, end) < 0 ? true : false;
                    break;

                case Period.Yearly:
                    end = new DateTime(year, 12, 31);
                    isIncomplete = DateTime.Compare(chore.EndDate, end) < 0 ? true : false;
                    break;

                case Period.TwoYearly:
                    end = new DateTime(year, 12, 31);
                    isIncomplete = DateTime.Compare(chore.EndDate, end) < 0 ? true : false;
                    break;

                case Period.FourYearly:
                    end = new DateTime(year, 12, 31);
                    isIncomplete = DateTime.Compare(chore.EndDate, end) < 0 ? true : false;
                    break;
            }

            return isIncomplete;
        }

        private Chore GetLastChore(Guid elementId, Guid gChoreId, int year)
        {
            Chore lastChore;
            lastChore = _choresCrudService.GetAll()
                        .Where(c => c.GenericChoreId == gChoreId && c.ElementId == elementId && c.StartDate.Year == year)
                        .OrderByDescending(c => c.StartDate)
                        .FirstOrDefault();

            return lastChore;
        }

        private TimeSpanToAddChores GetDefaultTimeSpan( int year)
        {
            TimeSpanToAddChores timeSpanToAddChores = new TimeSpanToAddChores();
            timeSpanToAddChores.Start = new DateTime(year, 1, 1, 0, 0, 0);
            timeSpanToAddChores.End = new DateTime(year, 12, 31, 23, 59, 59);
            return timeSpanToAddChores;
        }

        private TimeSpanToAddChores ResumeTimeSpan(Chore lastChore)
        {
            TimeSpanToAddChores timeSpanToAddChores = new TimeSpanToAddChores();
            timeSpanToAddChores.Start = new DateTime(lastChore.StartDate.Year, lastChore.StartDate.Month, lastChore.StartDate.Day).AddDays(1);
            timeSpanToAddChores.End = new DateTime(lastChore.StartDate.Year, 12, 31, 23, 59, 59);
            return timeSpanToAddChores;
        }

        private int AddingElements(NewChoresGuideline guideline)
        {
            Period period = guideline.GenericChore.Period;
            int choresAdded = 0;

            switch (period)
            {
                case Period.Daily:
                    choresAdded = AddDailyChore(guideline);
                    break;

                case Period.Weekly:
                    AddWeeklyChore(guideline);
                    break;

                case Period.Monthly:
                    AddMonthlyChore(guideline);
                    break;

                case Period.Bimonthly:
                    AddBimonthlyChore(guideline);
                    break;

                case Period.Quarterly:
                    AddQuarterlyChore(guideline);
                    break;

                case Period.Semester:
                    AddSemesterChore(guideline);
                    break;

                case Period.Yearly:
                    AddYearlyChore(guideline);
                    break;

                case Period.TwoYearly:
                    AddTwoYearlyChore(guideline);
                    break;

                case Period.FourYearly:
                    AddFourYearlyChore(guideline);
                    break;
            }
            return choresAdded;
        }


        private int AddDailyChore(NewChoresGuideline guideline)
        {
            DateTime endTimeSpan = guideline.TimeSpanToAddChores.End;
            DateTime startTimeSpan = guideline.TimeSpanToAddChores.Start;
            int choresAdded = 0;

            for (DateTime d = startTimeSpan; d <= endTimeSpan; d = d.AddDays(1))
            {
                DateTime choreStartDate = d;
                DateTime choreEndDate = new DateTime(d.Year, d.Month, d.Day, 23, 59, 59);

                Chore Chore = CreateChore(guideline, choreStartDate, choreEndDate);
                bool result = AddChoresToDatabase(guideline.GenericChore, Chore);
                if (result == true)
                    choresAdded++;

            }
            return choresAdded;
        }

        private void AddWeeklyChore(NewChoresGuideline guideline)
        {
            DateTime endTimeSpan = guideline.TimeSpanToAddChores.End;
            DateTime startTimeSpan = guideline.TimeSpanToAddChores.Start;
            DateTime dateFirstMonday = FirstMonday(startTimeSpan);
       
            for (DateTime d = dateFirstMonday; d <= endTimeSpan; d = d.AddDays(7))
            {
                DateTime choreStartDate = d;
                DateTime choreEndDate = GetLastDayOfWeek(d);

                Chore Chore = CreateChore(guideline, choreStartDate, choreEndDate);
                AddChoresToDatabase(guideline.GenericChore, Chore);
            }
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

        private void AddMonthlyChore(NewChoresGuideline guideline)
        {
            DateTime endTimeSpan = guideline.TimeSpanToAddChores.End;
            DateTime startTimeSpan = guideline.TimeSpanToAddChores.Start;
            DateTime firstDayOfTheMonth = GetFirstDayOfMonth(startTimeSpan);

            for (DateTime d = firstDayOfTheMonth; d <= endTimeSpan; d = d.AddMonths(1))
            {
                DateTime choreStartDate = d;
                DateTime choreEndDate = GetLastDayOfMonth(d);

                Chore Chore = CreateChore(guideline, choreStartDate, choreEndDate);
                AddChoresToDatabase(guideline.GenericChore, Chore);
            }
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

        private void AddBimonthlyChore(NewChoresGuideline guideline)
        {
            DateTime endTimeSpan = guideline.TimeSpanToAddChores.End;
            DateTime startTimeSpan = guideline.TimeSpanToAddChores.Start;
            DateTime firstDayOfBimonthly = GetFirstDayOfBimonthly(startTimeSpan);

            for (DateTime d = firstDayOfBimonthly; d <= endTimeSpan; d = d.AddMonths(2))
            {
                DateTime choreStartDate = d;
                DateTime choreEndDate = GetLastDayOfBimonthly(d);

                Chore Chore = CreateChore(guideline, choreStartDate, choreEndDate);
                AddChoresToDatabase(guideline.GenericChore, Chore);
            }
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

        private void AddQuarterlyChore(NewChoresGuideline guideline)
        {
            DateTime endTimeSpan = guideline.TimeSpanToAddChores.End;
            DateTime startTimeSpan = guideline.TimeSpanToAddChores.Start;
            DateTime firstDayOfQuarterly = GetFirstDayOfQuarterly(startTimeSpan);

            for (DateTime d = firstDayOfQuarterly; d <= endTimeSpan; d = d.AddMonths(3))
            {
                DateTime choreStartDate = d;
                DateTime choreEndDate = GetLastDayOfQuarterly(d);

                Chore Chore = CreateChore(guideline, choreStartDate, choreEndDate);
                AddChoresToDatabase(guideline.GenericChore, Chore);
            }
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

        private void AddSemesterChore(NewChoresGuideline guideline)
        {
            DateTime endTimeSpan = guideline.TimeSpanToAddChores.End;
            DateTime startTimeSpan = guideline.TimeSpanToAddChores.Start;
            DateTime firstDayOfSemester = GetFirstDayOfSemester(startTimeSpan);

            for (DateTime d = firstDayOfSemester; d <= endTimeSpan; d = d.AddMonths(6))
            {
                DateTime choreStartDate = d;
                DateTime choreEndDate = GetLastDayOfSemester(d);

                Chore Chore = CreateChore(guideline, choreStartDate, choreEndDate);
                AddChoresToDatabase(guideline.GenericChore, Chore);
            }
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

        private void AddYearlyChore(NewChoresGuideline guideline)
        {
            DateTime endTimeSpan = guideline.TimeSpanToAddChores.End;
            DateTime startTimeSpan = guideline.TimeSpanToAddChores.Start;
            DateTime firstDayOfYear = GetFirstDayOfYear(startTimeSpan);

            for (DateTime d = firstDayOfYear; d <= endTimeSpan; d = d.AddYears(1))
            {
                DateTime choreStartDate = d;
                DateTime choreEndDate = GetLastDayOfYear(d);

                Chore Chore = CreateChore(guideline, choreStartDate, choreEndDate);
                AddChoresToDatabase(guideline.GenericChore, Chore);
            }
        }
        private DateTime GetFirstDayOfYear(DateTime date)
        {
            return new DateTime(date.Year, 1, 1, 0, 0, 0);
        }
        private DateTime GetLastDayOfYear(DateTime date)
        {
            return new DateTime(date.Year, 12, 31, 23, 59, 59);
        }

        private void AddTwoYearlyChore(NewChoresGuideline guideline)
        {
            DateTime endTimeSpan = guideline.TimeSpanToAddChores.End;
            DateTime startTimeSpan = guideline.TimeSpanToAddChores.Start;
            DateTime firstDayOfTwoYearly = GetFirstDayOfTwoYearly(startTimeSpan);

            for (DateTime d = firstDayOfTwoYearly; d <= endTimeSpan; d = d.AddYears(2))
            {
                DateTime choreStartDate = d;
                DateTime choreEndDate = GetLastDayOfTwoYearly(d);

                Chore Chore = CreateChore(guideline, choreStartDate, choreEndDate);
                AddChoresToDatabase(guideline.GenericChore, Chore);
            }
        }
        private DateTime GetFirstDayOfTwoYearly(DateTime date)
        {
            return new DateTime(date.Year, 1, 1, 0, 0, 0);
        }
        private DateTime GetLastDayOfTwoYearly(DateTime date)
        {
            return new DateTime(date.Year, 12, 31, 23, 59, 59).AddYears(1);
        }
        private void AddFourYearlyChore(NewChoresGuideline guideline)
        {
            DateTime endTimeSpan = guideline.TimeSpanToAddChores.End;
            DateTime startTimeSpan = guideline.TimeSpanToAddChores.Start;
            DateTime firstDayOfFourYearly = GetFirstDayOfFourYearly(startTimeSpan);

            for (DateTime d = firstDayOfFourYearly; d <= endTimeSpan; d = d.AddYears(4))
            {
                DateTime choreStartDate = d;
                DateTime choreEndDate = GetLastDayOffourYearly(d);

                Chore Chore = CreateChore(guideline, choreStartDate, choreEndDate);
                AddChoresToDatabase(guideline.GenericChore, Chore);
            }
        }
        private DateTime GetFirstDayOfFourYearly(DateTime date)
        {
            return new DateTime(date.Year, 1, 1, 0, 0, 0);
        }
        private DateTime GetLastDayOffourYearly(DateTime date)
        {
            return new DateTime(date.Year, 12, 31, 23, 59, 59).AddYears(3);
        }

        private bool AddChoresToDatabase(GenericChore gChore, Chore chore)
        {
            var choreResult = _choresCrudService.Add(chore);
            bool OK = false;
            if (choreResult.Id != default)
            {
                _formatService.AddFormatValuesToChore(gChore.Id, choreResult.Id);
                OK = true;
            }
            return OK;
        }

        private Chore CreateChore(NewChoresGuideline guideline, DateTime startDate, DateTime endDate)
        {
            Chore Chore = new Chore()
            {
                ElementId = guideline.ElementId,
                StartDate = startDate,
                EndDate = endDate,
                GenericChoreId = guideline.GenericChore.Id,
                Status = ChoreStatus.Undone,
            };

            return Chore;
        }
    }
}
