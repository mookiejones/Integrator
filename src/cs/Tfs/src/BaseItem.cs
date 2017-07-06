using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Threading.Tasks;
namespace Tfs
{
    public abstract class BaseItem:IBaseItem
    {
        public abstract string GetQuery();
        const string API_KEY = "maso4j4a6lketok2btjklanprnek7ndlcvr4rdu5u2udpbbi73na";
        const string SERVER_URL = "https://kukasim.visualstudio.com";

    #region Methods
            
        public static async Task<T> GetItemsAsync<T>(string query){
             var uri = new Uri(SERVER_URL);
             using(var client = GetClient()){
                 var response = await client.GetAsync(query);

                 // Check to see if we have a successful response
                 
                 if(response.IsSuccessStatusCode){
                     var result = await response.Content.ReadAsAsync<T>();
                     return result;
                 }
             }
             return default(T);
            
        }
         

         public static T GetItems<T>(string query){
             var uri = new Uri(SERVER_URL);
             using(var client = GetClient()){
                 var response = client.GetAsync(query).Result;

                 // Check to see if we have a successful response
                 
                 if(response.IsSuccessStatusCode){
                     var result = response.Content.ReadAsAsync<T>().Result;
                     return result;
                 }
             }
             return default(T);
         }

        public static string GetItems(string query)
        {
              var uri = new Uri(SERVER_URL);
              using(var client = GetClient()){
                  HttpResponseMessage response = client.GetAsync(query).Result;
                  // Check to see if we have a successful response
                  if(response.IsSuccessStatusCode){
                      var result =response.Content.ReadAsStringAsync().Result;
                      
                      Console.WriteLine(result);
                      return result;
                  }
              }
              return null;   
        }

        public List<T> Deserialize<T>(string value)
        where T:BaseItem{
            var obj = (ItemsResult<T>)JsonConvert.DeserializeObject(value,typeof(ItemsResult<T>));
            return obj.value;
        }
        public abstract List<T> GetItems<T>()
        where T:BaseItem;

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



        #endregion

    }

public class ItemsResult<T>
where T:BaseItem{         public int count{get;set;}
        public List<T> value{get;set;}
}

 public static class CoreEx{

     public static List<T> ToList<T>(this ItemsResult<T> items)
        where T:BaseItem
     {

         return items.value;
     }
     public static async Task<T> ReadAsAsync<T>(this HttpContent content)
     {
         var type= typeof(T);
         var name = type.GenericTypeArguments[0].Name;

         var json = await content.ReadAsStringAsync();
         try{
         var result = JsonConvert.DeserializeObject<T>(json);
         return result;
         }catch(Exception ex){
            Console.WriteLine(ex);
            Console.WriteLine(json);
         }
         return default(T);
     }
 }public static class BaseItemEx<T> where T:BaseItem
{
        public static List<T> ParseItems(T item){
        var query = item.GetQuery();
        var text= BaseItem.GetItems(query);
        var obj = item.Deserialize<T>(text);
        return obj;
    }
}
}