namespace Tfs 
{
    using System;
    using System.Collections.Generic;


    public class RootQuery:BaseItem
    {
         public string id { get; set; }
        public string name { get; set; }
        public string path { get; set; }
        public RootItem createdBy { get; set; }
        public DateTime createdDate { get; set; }
        public RootItem lastModifiedBy { get; set; }
        public DateTime lastModifiedDate { get; set; }
        public bool isFolder { get; set; }
        public bool hasChildren { get; set; }
        public bool isPublic { get; set; }
        public Links _links { get; set; }
        public string url { get; set; }
        public Child[] children { get; set; }

        public override List<T> GetItems<T>()
        {
            throw new NotImplementedException();
        }

        public override string GetQuery()
        {
            throw new NotImplementedException();
        }
    }


    public class RootItem{
          public string id { get; set; }
        public string name { get; set; }
        public object url { get; set; }
    }
     
  

    public class Links
    {
        public WebLink self { get; set; }
        public WebLink html { get; set; }
         public WebLink parent { get; set; }
        public WebLink wiql { get; set; }
    }

    public class WebLink{
         public string href { get; set; }
    }
   
 public class Child:RootItem
    {
     
        public string path { get; set; }
        public RootItem createdBy { get; set; }
        public DateTime createdDate { get; set; }
        public RootItem lastModifiedBy { get; set; }
        public DateTime lastModifiedDate { get; set; }
        public bool isPublic { get; set; }
        public Links _links { get; set; }
      
        public bool isFolder { get; set; }
        public bool hasChildren { get; set; }
    }
      
  
  
}