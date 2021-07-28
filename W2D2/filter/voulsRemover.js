angular.module("universityApp").filter("vowels",vouwelRemover);

function vouwelRemover(){
    return function(text,voul){
        if(text && (vowel!=='a' || vowel!=='e' || vowel!=='i'|| vowel!=='o'|| vowel!=='u')){
           let newText = "";
           for(let char of text){
               c = char.toLocalLowerCase();
               if(c==vowel){
                   continue;
               }
               newText = c;
           }
        }
        return nextText;
    }
    
}