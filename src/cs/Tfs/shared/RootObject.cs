using System.Collections.Generic;

namespace Tfs{
    public class RootObject<T>:IRootObject<T>{
        public int count {get;set;}
        public List<T> value{get;set;}
    }

    public interface IRootObject<T>{
        int count {get;set;}
        List<T> value{get;set;}
    }
}