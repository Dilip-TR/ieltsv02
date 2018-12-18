routerApp.controller('sec5Cntrl', function($scope, $rootScope, $state, $window, $filter, $http, $interval, test1Service,$timeout, $cookieStore, reviewreadingService) {
  if ($cookieStore.get('loginAccess') == undefined) {
      $state.go('login');
  }
  //alert("enter in");
console.log($cookieStore.get("loginAccess").testId);
  $scope.active = true;
  $scope.active1 = true;
  $scope.getIndexQua11 = 0;
  $scope.totalWriteingTime=60;
  $scope.actque=0;
  $scope.actque1=0;
  $scope.part="part1";
  $scope.reviewModel=9990;
  saveDataTime = 0 ;
  $scope.index1=0 ;
 $scope.getReadingResult=[] ;
  $scope.getListenResult=[] ;
  $scope.getWritingResult=[] ;
  $scope.loader=false;
 
  $scope.userAnsIsCorrect=function(obj,type,isAns,index,part){
            //console.log(obj,type);
            //alert("hello");
            var result ;
            switch(type){
              case 1: 
              // console.log( obj);
              var getIndex=_.findIndex(obj,function(x){
                return  x.user_ans === 1 ;
              });
              //console.log(getIndex) ;
              if(getIndex === -1){
                //Student not attended
                result = {
                  "userAns" :"" ,
                  "correctAns" :  isAns ,
                  "result" : false,
                  "part" : part ,
                  "type" :type 
                }
              }else{
                //User Attended 
                //console.log(getIndex,isAns,obj[getIndex].name);
                var getCorrectAns=_.findIndex(isAns,function(x){
                  return  String(x)  ===  obj[getIndex].name  ;
                  });
                  //console.log(getCorrectAns);
                  if(getCorrectAns != -1){
                    //Correct Ans
                    result = {
                      "userAns" : obj[getIndex].name ,
                      "correctAns" :  isAns ,
                      "result" : true ,
                      "part" : part ,
                      "type" :type  
                    }
                  }else{
                    //Wrong Ans
                    result = {
                      "userAns" : obj[getIndex].name ,
                      "correctAns" :  isAns ,
                      "result" : false ,
                      "part" : part  ,
                      "type" :type 
                    }
                  }
                //result =false ;
              }
              break ;
              case 2: 
            //   console.log(obj);
              if(obj.user_ans){
              //User Attended ws
             //console.log(getIndex,isAns,obj[getIndex].user_ans);
              var getCorrectAns=_.findIndex(isAns,function(x){
                return   x.trim().toUpperCase()  ===  obj.user_ans.trim().toUpperCase()  ;
                });
              //console.log(getCorrectAns);
              if(getCorrectAns != -1){
              //Correct Ans
                  result = {
                    "userAns" : obj.user_ans ,
                    "correctAns" :  isAns ,
                    "result" : true ,
                    "part" : part  ,
                    "type" :type 
                  }
                }else{
                //Wrong Ans
                  result = {
                    "userAns" : obj.user_ans ,
                    "correctAns" :  isAns ,
                    "result" : false ,
                    "part" : part  ,
                    "type" :type 
                  }
                }
            }else{
                //Student not attended
                  result = {
                  "userAns" :"" ,
                  "correctAns" :  isAns ,
                  "result" : false,
                  "part" : part  ,
                  "type" :type 
                }
            }
              break ;
              case 3:
              if(obj.user_ans){
              //User Attended 
               //console.log(getIndex,isAns,obj.user_ans);
              var getCorrectAns=_.findIndex(isAns,function(x){
                return   x.trim().toUpperCase()  ===  obj.user_ans.trim().toUpperCase()  ;
                });
                //console.log(getCorrectAns);
                if(getCorrectAns != -1){
                  //Correct Ans
                  result = {
                    "userAns" : obj.user_ans ,
                    "correctAns" :  isAns ,
                    "result" : true ,
                    "part" : part  ,
                    "type" :type 
                  }
                }else{
                  //Wrong Ans
                  result = {
                    "userAns" : obj.user_ans ,
                    "correctAns" :  isAns ,
                    "result" : false ,
                    "part" : part  ,
                    "type" :type 
                  }
                }
            }else{
                  //Student not attended
                 result = {
                  "userAns" :"" ,
                  "correctAns" :  isAns ,
                  "result" : false,
                  "part" : part  ,
                  "type" :type 
                }
            }
            break ;
            case 4: 
              //Note there is no questions we will see later
             // console.log( obj);
            var getIndex=_.findIndex(obj,function(x){
            return  x.user_ans === 1 ;
            });
          //console.log(getIndex) ;
            if(getIndex === -1){
              //Student not attended
              result = {
                "userAns" :"" ,
                "correctAns" :  isAns ,
                "result" : false,
                "part" : part ,
                "type" :type 
              }
            }else{
               //User Attended 
              console.log(getIndex,isAns,obj[getIndex].name);
              var getCorrectAns=_.findIndex(isAns,function(x){
                return  String(x)  ===  obj[getIndex].name  ;
              });
              console.log(getCorrectAns);
              if(getCorrectAns != -1){
                  //Correct Ans
                  result = {
                    "userAns" : obj[getIndex].name ,
                    "correctAns" :  isAns ,
                    "result" : true ,
                    "part" : part ,
                    "type" :type  
                  }
              }else{
                  //Wrong Ans
                  result = {
                    "userAns" : obj[getIndex].name ,
                    "correctAns" :  isAns ,
                    "result" : false ,
                    "part" : part  ,
                    "type" :type 
                  }
              }
              //  result =false ;
            }
          break ;    
              case 5: 
              //console.log( obj[obj.id].length);
              if(obj[obj.id].length){
              //User Attended 
              //console.log(isAns) ;
              //console.log(getIndex,isAns,obj[getIndex].user_ans);
              var getCorrectAns=_.findIndex(isAns,function(x){
                  return x.trim().toUpperCase()  ===  obj[obj.id][0]['actuall'].trim().toUpperCase()  ;
                });
                //console.log(getCorrectAns);
                if(getCorrectAns != -1){
                  //Correct Ans
                  result = {
                    "userAns" : obj[obj.id][0]['actuall'] ,
                    "correctAns" :  isAns ,
                    "result" : true ,
                    "part" : part  ,
                    "type" :type 
                  }
                }else{
                  //Wrong Ans
                  result = {
                    "userAns" :obj[obj.id][0]['actuall'] ,
                    "correctAns" :  isAns ,
                    "result" : false ,
                    "part" : part  ,
                    "type" :type 
                  }
                }
            }else{
                  //Student not attended
                  result = {
                  "userAns" :"" ,
                  "correctAns" :  isAns ,
                  "result" : false,
                  "part" : part  ,
                  "type" :type 
                }
            }
              break ;
              case 6: 
            //console.log(obj,index);
              //Note there is no questions we will see later
              var getArrayTrueLength=_.filter(obj.options,function(x){
                return x.user_ans == true ;
              }).length;
              var numOfLimit=obj.limit ;
            //  console.log(getArrayTrueLength,numOfLimit,index) ;
              if(index < getArrayTrueLength ){
                result = true ;
              }else{
                result = false ;
              }
              break ;    
            }
            return result;
    }
    $scope.typeResults=function(val,part,saveInvar){
          //  console.log(val.question_type_id) ;
                //QuestionType1
                if(val.question_type_id == 1){
                  // console.log(val.options);
                  $scope[saveInvar].push($scope.userAnsIsCorrect(val.options, 1 ,val.is_answer,0,part)) ; 
                    //console.log(getCheckedObj);
                }
                  //QuestionType2
                  if(val.question_type_id == 2){
                    //console.log(val.options);
                    angular.forEach(val.options,function(x){
                    $scope[saveInvar].push( $scope.userAnsIsCorrect(x, 2 ,x.is_answer,0,part) )  ;
                    })
                    //console.log(getCheckedObj);
                  }
                  if(val.question_type_id == 3){
                    //console.log(val.options);
                    angular.forEach(val.options,function(x){
                      $scope[saveInvar].push( $scope.userAnsIsCorrect(x, 3 ,x.is_answer,0,part) ) ;
                    })
                    //console.log(getCheckedObj);
                  }
                  if(val.question_type_id == 4){
                    //console.log(val.options);
                    angular.forEach(val.options,function(x){
                    $scope[saveInvar].push( $scope.userAnsIsCorrect(x, 4 ,x.is_answer,0,part) ) ;
                    })
                    //console.log(getCheckedObj);
                  }
                  if(val.question_type_id == 5){
                    angular.forEach(val.options,function(x,k){
                    $scope[saveInvar].push( $scope.userAnsIsCorrect(x, 5 ,x.is_answer,k,part) ) ;
                    })
                    //console.log(getCheckedObj);
                  }
    }
    $scope.calculation=function(){
             console.log( $scope.totalobj.reading.part1);
            // Reading part1
            angular.forEach( $scope.totalobj.reading.part1.quetions,function(val,key){
                $scope.typeResults(val,'part1','getReadingResult')   ;
            });
              // Reading part2
              angular.forEach( $scope.totalobj.reading.part2.quetions,function(val,key){
              $scope.typeResults(val,'part2','getReadingResult')   ;
              });
              // Reading part3
              angular.forEach( $scope.totalobj.reading.part3.quetions,function(val,key){
                $scope.typeResults(val,'part3','getReadingResult')   ;
              });
              // Listening part1
            angular.forEach( $scope.totalobj.listening.part1.quetions,function(val,key){
              $scope.typeResults(val,'part1','getListenResult')   ;
              });
              // listening part2
            angular.forEach( $scope.totalobj.listening.part2.quetions,function(val,key){
              $scope.typeResults(val,'part2','getListenResult')   ;
            });
              // listening part3
              angular.forEach( $scope.totalobj.listening.part3.quetions,function(val,key){
                $scope.typeResults(val,'part3','getListenResult')   ;
            });
            // listening part4
            angular.forEach( $scope.totalobj.listening.part4.quetions,function(val,key){
              $scope.typeResults(val,'part4','getListenResult')   ;
            });
            console.log($scope.getReadingResult,$scope.getListenResult) ;
    }
     // $scope.calculation() ;
     // writing data
$scope.totalobj=angular.fromJson($window.localStorage['toalObj']);
   $scope.quedata=$scope.totalobj.writing;
  console.log($scope.quedata);
   //if undefind
   
   if( $scope.quedata == undefined){
    alert("your test was terminated");
   $state.go("fulllength");

}
      //Inter for every second
  $scope.startInterVel =   $interval(function(){
        console.log('enter intervel',saveDataTime);
        //Writting section ;
        if(saveDataTime == 0){
          console.log('enter in',$scope.totalWriteingTime);
          if($scope.totalWriteingTime !=0){
            $scope.totalWriteingTime-- ;
            //$cookieStore.put("readingTimer",$scope.totalWriteingTime);
          }else{
            console.log("Your time is up");
            saveDataTime = 1 ;
            //$cookieStore.put("readingTimer",$scope.totalWriteingTime);
            $interval.cancel($scope.startInterVel) ;
           $window.localStorage['toalObj'] =  angular.toJson($scope.totalobj) ;
            // console.log('enter result',$window.localStorage['toalObj']);
            $scope.calculation() ;
            //Result data
            $scope.loadResultPage();
            //$state.go('result1'); 
          }
      }
  },1000)
 // $scope.reviewModel= true;

  $scope.checkIsReviewTrue=function(){
        // $scope.setReviewType=type ;
        // $scope.setParentInd=parInd ;
        // $scope.setindInd=indInd ;
        var result ;
        switch($scope.setReviewType){
          case 1: 
          console.log($scope.quedata[$scope.part]['quetions'][$scope.setParentInd].isReview) ;
          $scope.reviewModel= $scope.quedata[$scope.part]['quetions'][$scope.setParentInd].isReview ;
          break ;
          case 2: 
          $scope.reviewModel= $scope.quedata[$scope.part]['quetions'][$scope.setParentInd]['options'][$scope.setindInd].isReview;
          break ;
          case 3:
          $scope.reviewModel= $scope.quedata[$scope.part]['quetions'][$scope.setParentInd]['options'][$scope.setindInd].isReview;
          break ;
          case 4: 
          console.log($scope.quedata[$scope.part]['quetions'][$scope.setParentInd].isReview) ;
          $scope.reviewModel= $scope.quedata[$scope.part]['quetions'][$scope.setParentInd].isReview ;
          break ;     
          case 5: 
          $scope.reviewModel= $scope.quedata[$scope.part]['quetions'][$scope.setParentInd]['options'][$scope.setindInd].isReview ;
          break ;    
        }
        return result;
  }
  $scope.typeReviewRemainder=function(type,parInd,indInd){
        console.log(type,parInd,indInd) ;
        $scope.setReviewType=type ;
        $scope.setParentInd=parInd ;
        $scope.setindInd=indInd ;
        $scope.checkIsReviewTrue() ;
  }
  $scope.setReview=function(){
        // $scope.setReviewType=type ;
        // $scope.setParentInd=parInd ;
        // $scope.setindInd=indInd ;
        var result ;
        switch($scope.setReviewType){
          case 1: 
          $scope.quedata[$scope.part]['quetions'][$scope.setParentInd].isReview = $scope.quedata[$scope.part]['quetions'][$scope.setParentInd].isReview ? false : true ;
          $scope.reviewModel= $scope.quedata[$scope.part]['quetions'][$scope.setParentInd].isReview ;
          //console.log($scope.quedata[$scope.part]['quetions'][$scope.setParentInd].isReview) ;
          break ;
          case 2: 
          console.log($scope.quedata[$scope.part]['quetions'][$scope.setParentInd]['options'][$scope.setindInd].isReview) ;
          $scope.quedata[$scope.part]['quetions'][$scope.setParentInd]['options'][$scope.setindInd].isReview = $scope.quedata[$scope.part]['quetions'][$scope.setParentInd]['options'][$scope.setindInd].isReview ? false : true ;
          $scope.reviewModel= $scope.quedata[$scope.part]['quetions'][$scope.setParentInd]['options'][$scope.setindInd].isReview ;
          break ;
          case 3:
          //  console.log(obj.user_ans);
          $scope.quedata[$scope.part]['quetions'][$scope.setParentInd]['options'][$scope.setindInd].isReview = $scope.quedata[$scope.part]['quetions'][$scope.setParentInd]['options'][$scope.setindInd].isReview ? false : true ;
          $scope.reviewModel= $scope.quedata[$scope.part]['quetions'][$scope.setParentInd]['options'][$scope.setindInd].isReview ;
          break ;
          case 4: 
          $scope.quedata[$scope.part]['quetions'][$scope.setParentInd].isReview = $scope.quedata[$scope.part]['quetions'][$scope.setParentInd].isReview ? false : true ;
          $scope.reviewModel= $scope.quedata[$scope.part]['quetions'][$scope.setParentInd].isReview ;
          break ;     
          case 5: 
          $scope.quedata[$scope.part]['quetions'][$scope.setParentInd]['options'][$scope.setindInd].isReview = $scope.quedata[$scope.part]['quetions'][$scope.setParentInd]['options'][$scope.setindInd].isReview ? false : true ;
          $scope.reviewModel= $scope.quedata[$scope.part]['quetions'][$scope.setParentInd]['options'][$scope.setindInd].isReview ;
        }
        return result;

    
  }
  $scope.countPart=function(part){
      return $scope.quedata[part]['quetions'].length +1 ;
  }
 
$scope.countword=function(str){
  return  _.size(_.words(str));
  
 
 }
 $scope.isAtttend= function(obj,type){
    // console.log(obj,type);
  //    alert("hello");
      var result ;
      switch(type){
        case 1: 
        // console.log( obj.options);
         var getIndex=_.findIndex(obj.options,function(x){
          return x.user_ans != 0 ;
         });
      //   console.log(getIndex) ;
         if(getIndex !=-1){
          result = true ;
         }else{
          result =false ;
         }
        break ;
        case 2: 
        if(obj.user_ans){
          result = true ;
          }else{
              result = false ;
          }
        break ;
        case 3:
        //  console.log(obj.user_ans);
          if(obj.user_ans){
              result = true ;
          }else{
              result = false ;
          }
        break ;
        case 4: 
       console.log( obj );
          var getIndex=_.findIndex(obj.options,function(x){
              return x.user_ans != "" ;
             });
          //   console.log(getIndex) ;
             if(getIndex !=-1){
              result = true ;
             }else{
              result =false ;
             }
        break ;     
        case 5: 
        //console.log( obj[obj.id]);
         if(obj[obj.id].length){
          result = true ;
         }else{
          result = false ;
         }
        break ;    
      }
       return result;
  }

  $scope.changePart=function(ind){
      // alert(ind);
      if(ind!=0){
          $scope.actque1++;
      }else{
          $scope.actque1--;
      }
   
  }
  $scope.gotToNext=function(){
    $scope.showbtn=true;
    $interval.cancel($scope.startInterVel) ;
    $window.localStorage['toalObj'] =  angular.toJson($scope.totalobj) ;
    console.log('enter result',$window.localStorage['toalObj']);
    $scope.calculation() ;
    //Result data
    $scope.loadResultPage();
 
  }
  $scope.loadResultPage=function(){
      var resultData={
          "listening" : $scope.getListenResult ,
          "reading" :   $scope.getReadingResult ,
          "writing" :   $scope.getWritingResult 
      }
      console.log(resultData.reading);
      $scope.btndisable=true;
     $scope.totalobj.result=resultData ;
      $scope.totalobj.awastatus="process" ;
      var sendObj = {
          "useId": $cookieStore.get("loginAccess").id,
          "test_name": $cookieStore.get("testId"),
          "toalObj":$scope.totalobj,
          "testId":$cookieStore.get("testId"),
          "testType":"save",
          "awsstatus":"processing",
          "graphdata":{},
          "resultData":resultData,
          "r2":"",
          "r3":""
          }
          // console.log( $scope.toalObj.reading);
          // console.log(sendObj);
          //LessionIng
       test1Service.saveData(sendObj).then(function(res) {
         $scope.loader=true;
         $scope.showbtn=false;
          $scope.btndisable=false;
          $state.go("result1");
       });
    }
    $scope.getIsCorrectResult=function(objectData,userAns){
      //options.is_answer,options.
      var getFindInd=_.findIndex(objectData,function(x){
        return x === userAns; 
      });
      console.log(getFindInd) ;
      if(getFindInd !=-1){
        return true ;
      }else{
        return false ;
      }
    }
   
  $scope.removeBox=function(input,data,id){
      $scope.quedata[$scope.part]['quetions'][$scope.getIdPart2()]['options'][id][input].splice(0, 1); 
      $scope.quedata[$scope.part]['quetions'][$scope.getIdPart2()]['rights'].push(data);
  }
  $scope.MoveItem = function(origin, dest, item_id) {
  console.log(origin, dest, item_id)
    // Check if dropped in origin
    if (origin == dest) return;
      if(origin === 'rights'){
          console.log("rights to left") ;
          var findId=_.findIndex(  $scope.quedata[$scope.part]['quetions'][$scope.getIdPart2()]['rights'],function(x){
              return x.id === item_id ;
          });
          //split
          var splitDest= dest.split("-") ;
          if(  $scope.quedata[$scope.part]['quetions'][$scope.getIdPart2()]['options'][splitDest[1]][splitDest[0]].length == 0){
              var item =   $scope.quedata[$scope.part]['quetions'][$scope.getIdPart2()]['rights'].splice(findId, 1);
                $scope.quedata[$scope.part]['quetions'][$scope.getIdPart2()]['options'][splitDest[1]][splitDest[0]].push(item[0]);
             // console.log(   $scope.quedata[$scope.part]['quetions'][$scope.getIdPart2()]['options'],item[0]);
          }else{
              var item =   $scope.quedata[$scope.part]['quetions'][$scope.getIdPart2()]['rights'].splice(findId, 1);
                $scope.quedata[$scope.part]['quetions'][$scope.getIdPart2()]['rights'].push(  $scope.quedata[$scope.part]['quetions'][$scope.getIdPart2()]['options'][splitDest[1]][splitDest[0]][0])
                $scope.quedata[$scope.part]['quetions'][$scope.getIdPart2()]['options'][splitDest[1]][splitDest[0]].splice(0, 1);
                $scope.quedata[$scope.part]['quetions'][$scope.getIdPart2()]['options'][splitDest[1]][splitDest[0]].push(item[0]);
          }
          console.log(findId);
          $scope.typeReviewRemainder(2,$scope.getIdPart2(),splitDest[1]) ;
      }
      if(dest === 'rights'){
          console.log("enter in left to right");
          var splitDest= origin.split("-") ;
          $scope.quedata[$scope.part]['quetions'][$scope.getIdPart2()]['rights'].push(  $scope.quedata[$scope.part]['quetions'][$scope.getIdPart2()]['options'][splitDest[1]][splitDest[0]][0]);
          $scope.quedata[$scope.part]['quetions'][$scope.getIdPart2()]['options'][splitDest[1]][splitDest[0]].splice(0, 1); 
          $scope.typeReviewRemainder(2,$scope.getIdPart2(),splitDest[1]) ;
      }
      //Update UI
      $scope.$apply();
  }
  function uncheck_radio_before_click(radio) {

      if (radio.prop('checked'))
          radio.one('click', function() {
              radio.prop('checked', false);
          });
          return radio.prop('checked') ;
        
  }
  $('body').on('mouseup', 'input[type="radio"]', function() {
      var radio = $(this);
      uncheck_radio_before_click(radio);
      console.log(radio);
  });
  $('body').on('mouseup', 'label', function() {
      var label = $(this);
     
      var radio;
      if (label.attr('for')){
          radio = $('#' + label.attr('for')).filter('input[type="radio"]');
      }else {
          radio = label.children('input[type="radio"]');
      }
      if (radio.length){
        //  console.log( radio[0]['attributes']['name']) ;
          var parentQuaInd=Number( $(radio).attr('name').split("_")[1] ) ;
          var OptInd=Number($(radio).attr('name').split("_")[2] ) ;
         // console.log(strGetInd);
       _.map($scope.quedata[$scope.part]['quetions'][parentQuaInd].options, function(x) {
          // alert(x);
          return x.user_ans = 0;
      });
      if(uncheck_radio_before_click(radio)){
        $scope.quedata[$scope.part]['quetions'][parentQuaInd].options[OptInd].user_ans = 0;
      
      }else{
        $scope.quedata[$scope.part]['quetions'][parentQuaInd].options[OptInd].user_ans = 1;
      
      }
         
         
      }
          
  });
 
  $timeout(function(){
    //alert("enter in") ;
     var i=1 ;
     $('.part1a').each(function(){
        $(this).html(i++);
        console.log(i) ;
     });
    var j= i ;
     $('.part2a').each(function(){
         $(this).html(j++);
      });
      var k= j ;
      $('.part3a').each(function(){
         $(this).html(k++);
      });
      var l= k ;
      $('.part4a').each(function(){
         $(this).html(l++);
      });
 },  400);
});