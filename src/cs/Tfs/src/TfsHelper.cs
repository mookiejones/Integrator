namespace Tfs
{
    using System;
    using System.Net.Http;
    using System.Net.Http.Headers;
    using System.Text;
    using System.Linq;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using Newtonsoft.Json.Serialization;
    using Newtonsoft.Json;
    using Newtonsoft.Json.Linq;
    using Newtonsoft.Json.Schema;
    using Newtonsoft;
    using Newtonsoft.Json.Converters;
    using Newtonsoft.Json.Bson;
    public class TfsHelper
    {
        public const string URL = "https://kukasim.visualstudio.com/_git/RobotProgramming/";



        private static async Task<HttpContent> GetContent(string path)         
        {
                var project = "RobotProgramming";

            var personalAccessToken = "dz3xjfbpmgrxyhrfgmrnbqomf6pm3fhddjbib4euyzhasx6rtmaa";
            var credentials = Convert.ToBase64String(Encoding.ASCII.GetBytes(string.Format("{0}:{1}", "", personalAccessToken)));
            using(var client = new HttpClient())
            {

                client.BaseAddress = new Uri("https://kukasim.visualstudio.com");
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic", credentials);
                   //if you already know the query id, then you can skip this step
                var queryHttpResponseMessage = client.GetAsync($"{path}").Result;

                return queryHttpResponseMessage.Content;
            }
        }
        public static async void GetWorkItems()
        {
            var project = "RobotProgramming";

            var personalAccessToken = "dz3xjfbpmgrxyhrfgmrnbqomf6pm3fhddjbib4euyzhasx6rtmaa";
            var credentials = Convert.ToBase64String(Encoding.ASCII.GetBytes(string.Format("{0}:{1}", "", personalAccessToken)));

            // var path = $"{url}_apis/wit/queries?$depth=1&api-version=2.2";
            var path = "Shared Queries/Current Iteration/Open User Stories";     //path to the query   
 
            var temp = await GetContent($"{project}/_apis/wit/queries?$depth=1&api-version=2.2");
            var sss=await temp.ReadAsStringAsync();
            var serial = await temp.ReadAsAsync<RootItemCollection>();
            Console.WriteLine(sss);
            using (var client = new HttpClient())
            {

                client.BaseAddress = new Uri("https://kukasim.visualstudio.com");
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic", credentials);
               
                //if you already know the query id, then you can skip this step
                var queryHttpResponseMessage = client.GetAsync($"{project}/_apis/wit/queries/{path}?api-version=2.2").Result;


                if (queryHttpResponseMessage.IsSuccessStatusCode)
                {
                    //bind the response content to the queryResult object
                    var queryResult =  await queryHttpResponseMessage.Content.ReadAsAsync<QueryResult> ();


                  
                 
                    // var queryId = queryResult.Id;
                    var queryId = "c5edd77b-60af-4b5f-8d8a-db0df8899b56";
                    //using the queryId in the url, we can execute the query
                    
                    var httpResponseMessage = client.GetAsync($"{project}/_apis/wit/wiql/{queryId}?api-version=2.2").Result;

                    if (httpResponseMessage.IsSuccessStatusCode)
                    {
                       
                        var workItemQueryResult = httpResponseMessage.Content.ReadAsAsync<WorkItemQueryResult>().Result;

                        //now that we have a bunch of work items, build a list of id's so we can get details

                        var items = workItemQueryResult.WorkItems.Select(o=>o.Id.ToString());
                        var ids = string.Join(",",items);
                       
                       // Get Fields
                       var fieldItems = workItemQueryResult.Columns.Select(o=>o.ReferenceName);
                       var fields = string.Join(",",fieldItems);
                        //clean up string of id's



                        var getWorkItemsHttpResponse = client.GetAsync($"_apis/wit/workitems?ids={ids}&fields={fields}&asOf={workItemQueryResult.AsOf}&api-version=2.2").Result;

                        if (getWorkItemsHttpResponse.IsSuccessStatusCode)
                        {
                            var str= getWorkItemsHttpResponse.Content.ReadAsStringAsync().Result;
                           Console.WriteLine(str);
                            // var result = getWorkItemsHttpResponse.Content.ReadAsStringAsync().Result;
                            var result = getWorkItemsHttpResponse.Content.ReadAsAsync<QueryItemCollection>().Result;
                        }
                    }
                }
            }


        }


        public static void ListWorkItems(string name){

        }
        public class WorkItems
        {
            public int Count { get; set; }

            public List<Item> Items { get; set; }
            
        }
        public class Item:Workitem
        {
            public string Rev { get; set; }
            public SystemItem System { get; set; }

        }
        public class SystemItem
        {
            public string Id { get; set; }
            public string State { get; set; }
            public string Title { get; set; }
        }

        public class QueryResult
        {
            public string Id { get; set; }
            public string Name { get; set; }
            public string Path { get; set; }
            public string Url { get; set; }
        }

        public class WorkItemQueryResult
        {
            public string QueryType { get; set; }
            public string QueryResultType { get; set; }
            public DateTime AsOf { get; set; }
            public Column[] Columns { get; set; }

            // ReSharper disable once MemberHidesStaticFromOuterClass
            public Workitem[] WorkItems { get; set; }
        }

        public class Workitem
        {
            public int Id { get; set; }
            public string Url { get; set; }
        }

        public class Column
        {
            public string ReferenceName { get; set; }
            public string Name { get; set; }
            public string Url { get; set; }
        }


    }

 
 public static class CoreEx{
     public static async Task<T> ReadAsAsync<T>(this HttpContent content){
         var json = await content.ReadAsStringAsync();
         try{
         var result = JsonConvert.DeserializeObject<T>(json);
         return result;
         }catch(Exception ex){
            Console.WriteLine(ex);
         }
         return default(T);
     }
 }
}