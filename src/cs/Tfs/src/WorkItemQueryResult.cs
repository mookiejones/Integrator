using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using Newtonsoft.Json;
namespace Tfs
{
    public class WorkItemQueryResult
    {
          public string queryType { get; set; }
   public string queryResultType { get; set; }
   public DateTime asOf { get; set; }
   public Column[] columns { get; set; }
   public Workitem[] workItems { get; set; }
    }
}