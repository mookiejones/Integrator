namespace Tfs
{
   using Newtonsoft.Json;
public class Fields
{   [JsonProperty("System.Id")]
    public int SystemId { get; set; }
    [JsonProperty("System.WorkItemType")]
    public string SystemWorkItemType { get; set; }
[JsonProperty("System.State")]    public string SystemState { get; set; }
    [JsonProperty("System.AssignedTo")]public string SystemAssignedTo { get; set; }
     [JsonProperty("System.Title")]public string SystemTitle { get; set; }
     [JsonProperty("Microsoft.VSTS.Common.ValueArea")]public string MicrosoftVSTSCommonValueArea { get; set; }
     [JsonProperty("System.Tags")]public string SystemTags { get; set; }
}
 
}