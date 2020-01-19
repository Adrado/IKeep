import { useContext, useEffect} from 'react';
import { PartialReportService } from '../../providers/Providers';
import PartialReportRequest from '../../services/dtos/PartialReportRequest';


const usePartialReport = () =>
{
    const PartialReportsService = useContext(PartialReportService);
    const GetPartialReports = (year, installationId) =>
    {
        let partialReportRequest = new PartialReportRequest();
        partialReportRequest.Year = year;
        partialReportRequest.InstallationId = installationId;
        if(partialReportRequest.Year !== null && partialReportRequest.InstallationId !== null)
        {
            return PartialReportsService.GetPartialReport(partialReportRequest);
        }
    }


    useEffect(() => {},[])

    return(
        [
            GetPartialReports
        ]
    )
}

export default usePartialReport;