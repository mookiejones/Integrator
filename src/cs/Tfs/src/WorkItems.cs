using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using Newtonsoft.Json;
using System.Collections.Generic;
namespace Tfs
{
    public class WorkItems
    {
        
    const string API_KEY="maso4j4a6lketok2btjklanprnek7ndlcvr4rdu5u2udpbbi73na";
    const string SERVER_URL="https://kukasim.visualstudio.com";

  
 
 private static HttpClient GetClient(){
     var credentials= Convert.ToBase64String(System.Text.ASCIIEncoding.ASCII.GetBytes(string.Format("{0}:{1}", "", API_KEY)));
     var result = new HttpClient();
     result.BaseAddress=new Uri(SERVER_URL);
      result.DefaultRequestHeaders.Accept.Clear();
    result.DefaultRequestHeaders.Accept.Add(new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/json"));
    result.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic", credentials); 
    return result;
 }
    private static Uri GetBaseURI(){
        return new Uri(SERVER_URL);
    }
 
    public static List<Project> GetProjects(){

        var uri = new Uri(SERVER_URL);

        using(var client = GetClient()){
              //connect to the REST endpoint            
    HttpResponseMessage response = client.GetAsync("_apis/projects?stateFilter=All&api-version=1.0").Result;

    //check to see if we have a succesfull respond
    if (response.IsSuccessStatusCode)
    {
        //set the viewmodel from the content in the response

      //var  viewModel = response.Content.ReadAsAsync<ListofProjectsResponse.Projects>().Result;

        var value = response.Content.ReadAsStringAsync().Result;


        var result=(ProjectResult)JsonConvert.DeserializeObject(value,typeof(ProjectResult));
        return result.value;

    }   
      return null;
      
        
    }
    }
        public static void GetWorkItems(){
            string _personalAccessToken = API_KEY;
            string _credentials = Convert.ToBase64String(System.Text.ASCIIEncoding.ASCII.GetBytes($"\"\":{_personalAccessToken}"));


            using(var client = new HttpClient()){
                client.BaseAddress=new Uri(SERVER_URL);
                client.DefaultRequestHeaders.Accept.Clear();
                   client.DefaultRequestHeaders.Accept.Add(new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/json"));
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic", _credentials);

                //connect to the REST endpoint            
                HttpResponseMessage response = client.GetAsync("_apis/projects?stateFilter=All&api-version=1.0").Result;


            }

        }
    }
}