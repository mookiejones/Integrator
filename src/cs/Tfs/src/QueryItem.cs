using System;
using System.Collections.Generic;

namespace Tfs
{
    public class QueryItem:BaseItem
    {
        public int id { get; set; }
        public int rev { get; set; }
        public string url { get; set; }

        public Fields fields{get;set;}

        public override List<T> GetItems<T>()
        {
            throw new NotImplementedException();
        }

        public override string GetQuery()
        {
            throw new NotImplementedException();
        }
    }
}