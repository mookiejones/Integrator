using System.Collections.Generic;
namespace Tfs
{
    public class Transition
    {
        public string to{get;set;}
        public List<string> actions{get;set;}
    }
 



       public class Transitions{
           public List<Transition> Completed{get;set;}

             public List<Transition> Approved{get;set;}
       public List<Transition> Committed{get;set;}
       public List<Transition> Done{get;set;}
       public List<Transition> New{get;set;}
       public List<Transition> Removed{get;set;}
       public List<Transition> Requested{get;set;}
       public List<Transition> Accepted{get;set;}
       public List<Transition> InProgress{get;set;}
       public List<Transition> ToDo{get;set;}
       public List<Transition> Active{get;set;}
              public List<Transition> Open{get;set;}
       public List<Transition> Inactive{get;set;}
              public List<Transition> Design{get;set;}
       public List<Transition> Ready{get;set;}
         
       public List<Transition> InPlanning{get;set;}

       }
}