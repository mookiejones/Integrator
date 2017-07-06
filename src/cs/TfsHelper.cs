using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
// ReSharper disable ClassNeverInstantiated.Global
// ReSharper disable All

namespace TimePortal
{
    public class TfsHelper
    {
        public const string URL = "https://kukasim.visualstudio.com/_git/RobotProgramming/";


        public static async void GetWorkItems()
        {
            var project = "RobotProgramming";

            var personalAccessToken = "dz3xjfbpmgrxyhrfgmrnbqomf6pm3fhddjbib4euyzhasx6rtmaa";
            var credentials = Convert.ToBase64String(Encoding.ASCII.GetBytes(string.Format("{0}:{1}", "", personalAccessToken)));

            // var path = $"{url}_apis/wit/queries?$depth=1&api-version=2.2";
            var path = "Shared Queries/Current Iteration/Open User Stories";     //path to the query   
 

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
                  
                 
                    //var queryId = queryResult.id;
                    var queryId = "c5edd77b-60af-4b5f-8d8a-db0df8899b56";
                    //using the queryId in the url, we can execute the query
                    
                    var httpResponseMessage = client.GetAsync($"{project}/_apis/wit/wiql/{queryId}?api-version=2.2").Result;

                    if (httpResponseMessage.IsSuccessStatusCode)
                    {
                        var workItemQueryResult = httpResponseMessage.Content.ReadAsAsync<WorkItemQueryResult>().Result;

                        //now that we have a bunch of work items, build a list of id's so we can get details
                        var builder = new StringBuilder();
                        foreach (var item in workItemQueryResult.WorkItems)
                        {
                            builder.Append(item.Id.ToString()).Append(",");
                        }

                        //clean up string of id's
                        var ids = builder.ToString().TrimEnd(',');

                        var getWorkItemsHttpResponse = client.GetAsync($"_apis/wit/workitems?ids={ids}&fields=System.Id,System.Title,System.State&asOf={workItemQueryResult.AsOf}&api-version=2.2").Result;

                        if (getWorkItemsHttpResponse.IsSuccessStatusCode)
                        {
                            var result = getWorkItemsHttpResponse.Content.ReadAsStringAsync().Result;
                            // var result = getWorkItemsHttpResponse.Content.ReadAsAsync<List<Item>>().Result;
                        }
                    }
                }
            }


        }

        public static void CreateWorkItem(){
            Console.WriteLine();
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
}