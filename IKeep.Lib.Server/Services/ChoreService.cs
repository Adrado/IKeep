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
        
        private readonly ICrudService<Chore> _choresService;
        private readonly IKeepContext _context;

        public ChoreService(
            IKeepContext context,
            ICrudService<Chore> choreService
            )
        {
            _choresService = choreService;
            _context = context;
        }

        public IQueryable<Chore> GetAll()
        {
            return _context.Chores;
        }

        public bool AddChores(NewChoresRequest newChoresRequest)
        {
            bool response = false;
            IEnumerable<Element> elements;

            elements = GetElements(newChoresRequest);
            response = AddChoreToElements(elements, newChoresRequest.Year);

            return response;
        }

        private IEnumerable<Element> GetElements(NewChoresRequest newChoresRequest)
        {
            IEnumerable<Element> elements = new List<Element>();

            if (newChoresRequest.InstallationId != null)
                elements = GetInstallationElements(newChoresRequest.InstallationId);
            else if (newChoresRequest.BuildingId != null)
                elements = GetBuildingElements(newChoresRequest.BuildingId);
            else if (newChoresRequest.FloorId != null)
                elements = GetFloorElements(newChoresRequest.FloorId);
            else if (newChoresRequest.AreaId != null)
                elements = GetAreaElements(newChoresRequest.AreaId);

            return elements;
        }
        private IEnumerable<Element> GetInstallationElements(Guid? installationId)
        {
            var elements = new List<Element>();
            elements = (from Installation in _context.Installations
                        where Installation.Id == installationId
                        from Building in Installation.Buildings
                        from Floor in Building.Floors
                        from Area in Floor.Areas
                        from Element in Area.Elements
                        select Element).ToList();

            return elements;
        }

        private IEnumerable<Element> GetBuildingElements(Guid? buildingId)
        {
            var elements = new List<Element>();
            elements = (from Building in _context.Buildings
                        where Building.Id == buildingId
                        from Floor in Building.Floors
                        from Area in Floor.Areas
                        from Element in Area.Elements
                        select Element).ToList();
            return elements;
        }

        private IEnumerable<Element> GetFloorElements(Guid? floorId)
        {
            var elements = new List<Element>();
            elements = (from Floor in _context.Floors
                        where Floor.Id == floorId
                        from Area in Floor.Areas
                        from Element in Area.Elements
                        select Element).ToList();
            return elements;
        }

        private IEnumerable<Element> GetAreaElements(Guid? areaId)
        {
            var elements = new List<Element>();
            elements = (from Area in _context.Areas
                        where Area.Id == areaId
                        from Element in Area.Elements
                        select Element).ToList();
            return elements;
        }


        private bool AddChoreToElements(IEnumerable<Element> elements, int year)
        {
            foreach (Element element in elements)
            {
                AddElementChores(element, year);
            }
            return true;
        }

        private void AddElementChores(Element element, int year)
        {
            var elementGenericChores = element.ElementGenericChores;
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
                else if (DateTime.Compare(LastChore.StartDate, new DateTime(year, 12, 31)) < 0)
                    newChoresGuideline.TimeSpanToAddChores = ResumeTimeSpan(LastChore);
                else
                    continue;

                AddingElements(newChoresGuideline);
            }
        }

        private Chore GetLastChore(Guid elementId, Guid gChoreId, int year)
        {
            Chore lastChore;
            lastChore = _context.Chores
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

        private void AddingElements(NewChoresGuideline guideline)
        {
            Period period = guideline.GenericChore.Period;
            //DateTime StartDate = new DateTime(year, 1, 1, 0, 0, 0);
            //DateTime EndDate = new DateTime(year, 12, 31, 23, 59, 59);

            switch (period)
            {
                case Period.Daily:
                    AddDailyChore(guideline);
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
        }


        private void AddDailyChore(NewChoresGuideline guideline)
        {
            DateTime endDate = guideline.TimeSpanToAddChores.End;
            DateTime startDate = guideline.TimeSpanToAddChores.Start;

            for (DateTime d = startDate; d <= endDate; d = d.AddDays(1))
            {
                Chore Chore = new Chore
                {
                    ElementId = guideline.ElementId,
                    StartDate = d,
                    EndDate = new DateTime(d.Year, d.Month, d.Day, 23, 59, 59),
                    GenericChoreId = guideline.GenericChore.Id,
                    Status = ChoreStatus.Undone,
                    EntityStatus = EntityStatus.Active,
                };

                _choresService.Add(Chore);
            }
        }

        private void AddWeeklyChore(NewChoresGuideline guideline)
        {
            DateTime endDate = guideline.TimeSpanToAddChores.End;
            DateTime startDate = guideline.TimeSpanToAddChores.Start;
            DateTime dateFirstMonday = FirstMonday(startDate);
       
            for (DateTime d = dateFirstMonday; d <= endDate; d = d.AddDays(7))
            {
                Chore Chore = new Chore();
                Chore.ElementId = guideline.ElementId;
                Chore.StartDate = d;
                Chore.EndDate = d.AddDays(6.99);
                Chore.GenericChoreId = guideline.GenericChore.Id;
                Chore.Status = 0;

                _choresService.Add(Chore);
            }
        }

        private DateTime FirstMonday(DateTime date)
        {
            int day = date.Day;

            while ((new DateTime(date.Year, date.Month, ++day)).DayOfWeek != DayOfWeek.Monday) ;
            return new DateTime(date.Year, date.Month, day, 0, 0, 0);
        }

        private void AddMonthlyChore(NewChoresGuideline guideline)
        {
            DateTime endDate = guideline.TimeSpanToAddChores.End;
            DateTime startDate = guideline.TimeSpanToAddChores.Start;
            DateTime FirstDayOfTheMonth = GetFirstDayOfMonth(startDate);

            for (DateTime d = FirstDayOfTheMonth; d <= endDate; d = d.AddMonths(1))
            {
                Chore Chore = new Chore();
                Chore.ElementId = guideline.ElementId;
                Chore.StartDate = d;
                Chore.EndDate = GetLastDayOfMonth(d);
                Chore.GenericChoreId = guideline.GenericChore.Id;
                Chore.Status = 0;

                _choresService.Add(Chore);
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
            DateTime endDate = guideline.TimeSpanToAddChores.End;
            DateTime startDate = guideline.TimeSpanToAddChores.Start;
            DateTime FirstDayOfBimonthly = GetFirstDayOfBimonthly(startDate);

            for (DateTime d = FirstDayOfBimonthly; d <= endDate; d = d.AddMonths(2))
            {
                Chore Chore = new Chore();
                Chore.ElementId = guideline.ElementId;
                Chore.StartDate = d;
                Chore.EndDate = GetLastDayOfBimonthly(d);
                Chore.GenericChoreId = guideline.GenericChore.Id;
                Chore.Status = 0;

                _choresService.Add(Chore);
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
            DateTime endDate = guideline.TimeSpanToAddChores.End;
            DateTime startDate = guideline.TimeSpanToAddChores.Start;
            DateTime FirstDayOfQuarterly = GetFirstDayOfQuarterly(startDate);

            for (DateTime d = FirstDayOfQuarterly; d <= endDate; d = d.AddMonths(3))
            {
                Chore Chore = new Chore();
                Chore.ElementId = guideline.ElementId;
                Chore.StartDate = d;
                Chore.EndDate = GetLastDayOfQuarterly(d);
                Chore.GenericChoreId = guideline.GenericChore.Id;
                Chore.Status = 0;

                _choresService.Add(Chore);
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
            DateTime endDate = guideline.TimeSpanToAddChores.End;
            DateTime startDate = guideline.TimeSpanToAddChores.Start;
            DateTime FirstDayOfSemester = GetFirstDayOfSemester(startDate);

            for (DateTime d = FirstDayOfSemester; d <= endDate; d = d.AddMonths(6))
            {
                Chore Chore = new Chore();
                Chore.ElementId = guideline.ElementId;
                Chore.StartDate = d;
                Chore.EndDate = GetLastDayOfSemester(d);
                Chore.GenericChoreId = guideline.GenericChore.Id;
                Chore.Status = 0;

                _choresService.Add(Chore);
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
            DateTime endDate = guideline.TimeSpanToAddChores.End;
            DateTime startDate = guideline.TimeSpanToAddChores.Start;
            DateTime FirstDayOfYear = GetFirstDayOfYear(startDate);

            for (DateTime d = FirstDayOfYear; d <= endDate; d = d.AddYears(1))
            {
                Chore Chore = new Chore();
                Chore.ElementId = guideline.ElementId;
                Chore.StartDate = d;
                Chore.EndDate = GetLastDayOfYear(d);
                Chore.GenericChoreId = guideline.GenericChore.Id;
                Chore.Status = 0;

                _choresService.Add(Chore);
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
            DateTime endDate = guideline.TimeSpanToAddChores.End;
            DateTime startDate = guideline.TimeSpanToAddChores.Start;
            DateTime FirstDayOfTwoYearly = GetFirstDayOfTwoYearly(startDate);

            for (DateTime d = FirstDayOfTwoYearly; d <= endDate; d = d.AddYears(2))
            {
                Chore Chore = new Chore();
                Chore.ElementId = guideline.ElementId;
                Chore.StartDate = d;
                Chore.EndDate = GetLastDayOfTwoYearly(d);
                Chore.GenericChoreId = guideline.GenericChore.Id;
                Chore.Status = 0;

                _choresService.Add(Chore);
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
            DateTime endDate = guideline.TimeSpanToAddChores.End;
            DateTime startDate = guideline.TimeSpanToAddChores.Start;
            DateTime FirstDayOfFourYearly = GetFirstDayOfFourYearly(startDate);

            for (DateTime d = FirstDayOfFourYearly; d <= endDate; d = d.AddYears(4))
            {
                Chore Chore = new Chore();
                Chore.ElementId = guideline.ElementId;
                Chore.StartDate = d;
                Chore.EndDate = GetLastDayOffourYearly(d);
                Chore.GenericChoreId = guideline.GenericChore.Id;
                Chore.Status = 0;

                _choresService.Add(Chore);
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
    }
}

       