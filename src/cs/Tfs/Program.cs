using System;
using System.Linq;
namespace Tfs
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Hello World!");


            var projectQuery = TfsHelper.GetQueriesForProject("RobotProgramming");

            var ps = TfsHelper.GetItems<Project>(projectQuery);
            var workQuery=TfsHelper.GetWorkItemQuery("RobotProgramming");
            var workItemsAsync = TfsHelper.GetItemsAsync<RootQuery>(workQuery).Result;
            var projects = TfsHelper.GetItems<Project>(TfsHelper.PROJECT_QUERY)
            .ToList();

            var workItems = TfsHelper.GetItems<Workitem>(workQuery);
            Workitem.ParseItems();

            TfsHelper.GetWorkItems();

         //   var result=Project.GetItems();



        }
    }
}
