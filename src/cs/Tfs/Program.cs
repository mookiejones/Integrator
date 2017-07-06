using System;
using System.Linq;
namespace Tfs
{
    class Program
    {
        static void Main(string[] args)
        {
           var workitems=  Workitem.ParseItems();
foreach(var item in workitems)
{
    
}
            Console.WriteLine("Hello World!");
var query = $"RobotProgramming/_apis/wit/queries/Shared%20Queries/AllQuery?api-version=2.2";
            var id = TfsHelper.GetQueryId("RobotProgramming","AllQuery");


            var str = TfsHelper.GetContentString($"RobotProgramming/_apis/wit/queries/{id}?api-version=2.2");
            var q = TfsHelper.GetItems<RootQuery>(query);
Console.WriteLine(str);
            TfsHelper.GetWorkItems();
            var projects = Project.GetItems()
            .Select(o=>o.name);
            foreach(var project in projects)
                Console.WriteLine($"project: {project}");

         //   var result=Project.GetItems();
           


        }
    }
}
