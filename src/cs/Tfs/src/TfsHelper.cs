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

        #region Query Strings
                public const string PROJECT_QUERY="_apis/projects?stateFilter=All&api-version=1.0";

                    const string API_KEY = "maso4j4a6lketok2btjklanprnek7ndlcvr4rdu5u2udpbbi73na";
        const string SERVER_URL = "https://kukasim.visualstudio.com";

        public static string GetQueriesForProject(string project){
            var result=$"{project}/_apis/wit/queries?$depth=1&api-version=2.2";
            return result;

        }
        public static string GetWorkItemQuery(string project){
         var  result = $"{project}/_apis/wit/workItemTypes?api-version=1.0";
         result = $"{project}/_apis/wit/workitems?api-version=1.0";
            return result;   
        }
        #endregion

        private static HttpClient GetClient()
        {
            var credentials = Convert.ToBase64String(System.Text.ASCIIEncoding.ASCII.GetBytes(string.Format("{0}:{1}", "", API_KEY)));
            var result = new HttpClient();
            result.BaseAddress = new Uri(SERVER_URL);
            result.DefaultRequestHeaders.Accept.Clear();
            result.DefaultRequestHeaders.Accept.Add(new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/json"));
            result.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic", credentials);
            return result;
        }

        public static async Task<ItemsResult<T>> GetItemsAsync<T>(string query)
            where T:BaseItem{
             var uri = new Uri(SERVER_URL);
             using(var client = GetClient()){
                 var response = await client.GetAsync(query);

                 // Check to see if we have a successful response
                 
                 if(response.IsSuccessStatusCode){
                     var result = await response.Content.ReadAsAsync<ItemsResult<T>>();
                     return result;
                 }
             }
             return default(ItemsResult<T>);                
            }
        public static ItemsResult<T> GetItems<T>(string query)
            where T:BaseItem
        {
             var uri = new Uri(SERVER_URL);
             using(var client = GetClient()){
                 var response = client.GetAsync(query).Result;

                 // Check to see if we have a successful response
                 
                 if(response.IsSuccessStatusCode){
                     var result = response.Content.ReadAsAsync<ItemsResult<T>>().Result;
                     return result;
                 }
             }
             return default(ItemsResult<T>);

        }
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
            var serial = await temp.ReadAsAsync<ItemsResult<RootQuery>>();
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
                            var result = getWorkItemsHttpResponse.Content.ReadAsAsync<ItemsResult<QueryItem>>().Result;
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

 
}