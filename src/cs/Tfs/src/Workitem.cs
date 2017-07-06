using System;
using System.Collections.Generic;
using Newtonsoft.Json;
using System.Linq;
using System.Threading.Tasks;
namespace Tfs
{

    public class Icon{
        public string id{get;set;}
        public string url{get;set;}
    }
    public class Workitem : BaseItem
    {

        public string name { get; set; }
        public string description { get; set; }
        public string color { get; set; }
        public Icon icon { get; set; }

        public int id { get; set; }
        public string url { get; set; }
        public string xmlForm { get; set; }

        public List<FieldInstance> fieldInstances { get; set; }

        public Transitions transitions { get; set; }

        #region Methods
                
            private static async Task<List<Workitem>> GetWorkItemFromProjectAsync(string project){
                return await Task.Run(()=>GetWorkItemFromProject(project));
            }

            private static List<Workitem> GetWorkItemFromProject(string project){
                var obj = GetItems(project);
                var result = (ItemsResult<Workitem>)JsonConvert.DeserializeObject(obj,typeof(ItemsResult<Workitem>));
                return result.value;
            }

            private static async Task<List<Workitem>> GetWorkItemsFromProjects(List<string> projects){
                var result = new List<Workitem>(projects.Count);
                foreach(var project in projects){
                    var p = await GetWorkItemFromProjectAsync(project);
                    result.AddRange(p);
                }
                return result;

            
            }

            public static string GetIds(string project){
                var query = $"{project}/_apis/wit/workItemTypes?api-version=1.0";
                var items = GetItems<Project>(query);

                return "";
            }
            public static void ParseItems()
            {

                var projects = Project.GetItems()
                    .Select(o => $"{o.name}/_apis/wit/workItemTypes?api-version=1.0")
                    .ToList();
    
                var result = GetWorkItemsFromProjects(projects).Result;
    
            }
            public override List<T> GetItems<T>()
            {
                var projects = Project.GetItems()
                .Select(p => $"{p.name}/_apis/wit/workItemTypes?api-version=1.0")
                .ToList();




                throw new NotImplementedException();
            }

            public override string GetQuery()
            {
                //if you already know the query id, then you can skip this step
                //       HttpResponseMessage queryHttpResponseMessage = client.GetAsync(project + "/_apis/wit/queries/" + path + "?api-version=2.2").Result;
                return "_apis/wit/workitems?api-version=2.2";
                //return "_apis/workitems?stateFilter=All&api-version=1.0";

                //            var projects = GetItems<Project>();
            }
        #endregion

    }
}