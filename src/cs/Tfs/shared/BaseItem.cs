using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using Newtonsoft.Json;
using System.Collections.Generic;
namespace Tfs
{
    public abstract class BaseItem:IBaseItem
    {
        public abstract string GetQuery();
        const string API_KEY = "maso4j4a6lketok2btjklanprnek7ndlcvr4rdu5u2udpbbi73na";
        const string SERVER_URL = "https://kukasim.visualstudio.com";

         

        public static ItemsResult<T> GetItems<T>(string query)
            where T:BaseItem{
                var uri = new Uri(SERVER_URL);
              using(var client = GetClient()){
                  HttpResponseMessage response = client.GetAsync(query).Result;
                  // Check to see if we have a successful response
                  if(response.IsSuccessStatusCode){
                      var result =response.Content.ReadAsAsync<ItemsResult<T>>().Result;
                      return result;
                  }
              }
              return null;   
            }
        public static string GetItems(string query)
        {
              var uri = new Uri(SERVER_URL);
              using(var client = GetClient()){
                  HttpResponseMessage response = client.GetAsync(query).Result;
                  // Check to see if we have a successful response
                  if(response.IsSuccessStatusCode){
                      var result =response.Content.ReadAsStringAsync().Result;
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


  /*      public static List<T> GetItems<T>()
        where T:BaseItem{

            var ctx = Activator.CreateInstance<T>();
            var query = ctx.GetQuery();
            var value = GetItems(query);

            var result=(ItemsResult<T>)JsonConvert.DeserializeObject(value,typeof(ItemsResult<T>));
            return result.value;

            
        }*/
    }

public class ItemsResult<T>
where T:BaseItem{         public int count{get;set;}
        public List<T> value{get;set;}
}

public static class BaseItemEx<T> where T:BaseItem{
    public static List<T> ParseItems(T item){
        var query = item.GetQuery();
        var text= BaseItem.GetItems(query);
        var obj = item.Deserialize<T>(text);
        return obj;
    }
}
}