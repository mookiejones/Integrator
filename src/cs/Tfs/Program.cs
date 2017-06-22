using System;
using System.Linq;
namespace Tfs
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Hello World!");

            var projects = Project.GetItems()
            .Select(o=>o.name);
            foreach(var project in projects)
                Console.WriteLine($"project: {project}");

         //   var result=Project.GetItems();
            Workitem.ParseItems();

        }
    }
}
