using System;
using System.Collections.Generic;
using Newtonsoft.Json;
namespace Tfs
{
    public class Project:BaseItem
    {

        public override string GetQuery(){
            return "_apis/projects?stateFilter=All&api-version=1.0";
        }

        public static List<Project> GetItems(){
            var stringValue = GetItems("_apis/projects?stateFilter=All&api-version=1.0");
            var result = (ItemsResult<Project>)JsonConvert.DeserializeObject(stringValue,typeof(ItemsResult<Project>));
            return result.value;
        }
        public override List<T> GetItems<T>()
        {
            var stringValue = GetItems(GetQuery());
            var result = Deserialize<T>(stringValue);
            return result;
        }

        public object id { get; set; }
        public string name { get; set; }
        public string description { get; set; }
        public string url { get; set; }
                public string state { get; set; }
                        public int revision { get; set; }
        public string visibility { get; set; }

 
    }

    public class ProjectResult{
        public int count{get;set;}
        public List<Project> value{get;set;}
    }
}