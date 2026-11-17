using Aiaetar.Api.Data;
using ClosedXML.Excel;

namespace Aiaetar.Api.Services;

public static class CertificateExcel
{
    private static readonly Dictionary<string, string> Headers = new(StringComparer.Ordinal)
    {
        ["ID المتدرب"] = "traineeId",
        ["المتدرب ID"] = "traineeId",
        ["رقم الشهادة"] = "certificateNo",
        ["الاسم الكامل"] = "fullName",
        ["جهة الاعتماد"] = "accreditationBody",
        ["نوع الشهادة"] = "certificateType",
        ["البرنامج التدريبي"] = "trainingProgram",
        ["الوظيفة"] = "jobTitle",
        ["جهة العمل"] = "workplace",
        ["تاريخ التدريب"] = "trainingDate",
        ["عدد ساعات التدريب"] = "trainingHours",
    };

    public static byte[] Export(IEnumerable<Certificate> certificates)
    {
        using var workbook = new XLWorkbook();
        var sheet = workbook.Worksheets.Add("الشهادات");
        string[] columns =
        [
            "جهة الاعتماد",
            "رقم الشهادة",
            "نوع الشهادة",
            "عدد ساعات التدريب",
            "تاريخ التدريب",
            "البرنامج التدريبي",
            "الوظيفة",
            "جهة العمل",
            "الاسم الكامل",
            "المتدرب ID",
        ];
        for (var i = 0; i < columns.Length; i++) sheet.Cell(1, i + 1).Value = columns[i];

        var rowIndex = 2;
        foreach (var certificate in certificates)
        {
            sheet.Cell(rowIndex, 1).Value = certificate.AccreditationBody;
            sheet.Cell(rowIndex, 2).Value = certificate.CertificateNo;
            sheet.Cell(rowIndex, 3).Value = certificate.CertificateType;
            sheet.Cell(rowIndex, 4).Value = certificate.TrainingHours;
            sheet.Cell(rowIndex, 5).Value = certificate.TrainingDate.ToString("yyyy-MM-dd");
            sheet.Cell(rowIndex, 6).Value = certificate.TrainingProgram;
            sheet.Cell(rowIndex, 7).Value = certificate.JobTitle;
            sheet.Cell(rowIndex, 8).Value = certificate.Workplace;
            sheet.Cell(rowIndex, 9).Value = certificate.FullName;
            sheet.Cell(rowIndex, 10).Value = certificate.TraineeId;
            rowIndex++;
        }

        double[] widths = [35, 12, 20, 10, 14, 25, 20, 20, 25, 10];
        for (var i = 0; i < widths.Length; i++) sheet.Column(i + 1).Width = widths[i];

        using var stream = new MemoryStream();
        workbook.SaveAs(stream);
        return stream.ToArray();
    }

    public static List<ImportedRow> Read(Stream stream)
    {
        using var workbook = new XLWorkbook(stream);
        var sheet = workbook.Worksheet(1);
        var headerRow = sheet.FirstRowUsed();
        if (headerRow == null) return [];

        var columns = new Dictionary<int, string>();
        foreach (var cell in headerRow.CellsUsed())
        {
            var label = cell.GetString().Trim();
            columns[cell.Address.ColumnNumber] = Headers.TryGetValue(label, out var field) ? field : label;
        }

        var rows = new List<ImportedRow>();
        foreach (var row in sheet.RowsUsed().Skip(1))
        {
            var values = new Dictionary<string, string>(StringComparer.Ordinal);
            foreach (var (column, field) in columns)
            {
                var cell = row.Cell(column);
                values[field] = cell.DataType == XLDataType.DateTime
                    ? cell.GetDateTime().ToString("yyyy-MM-dd")
                    : cell.GetString().Trim();
            }
            if (values.Values.All(string.IsNullOrWhiteSpace)) continue;
            rows.Add(new ImportedRow(values));
        }
        return rows;
    }
}

public record ImportedRow(Dictionary<string, string> Values);
