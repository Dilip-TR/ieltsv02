routerApp.controller('sec3Cntrl', function($scope,$rootScope, $state, $window, $filter, $http, $interval,test1Service, $timeout, $cookieStore, reviewreadingService) {
    if ($cookieStore.get('loginAccess') == undefined) {
        $state.go('login');
    }
    //alert("enter in");
    $scope.active = true;
    $scope.active1 = true;
    $scope.getIndexQua11 = 0;
    $scope.loader=true;
    // $scope.totalReadingTime=0;
    $scope.actque=0;
    $scope.part="part1";
    $scope.reviewModel=9990;
    $scope.totalReadingTime=300;
    $scope.index1=0 ;
    // $scope.totalReadingTime=300; 
    var saveData=0; 
  

   
    $scope.checkBoxValidType6=function(ind,data){
        console.log(ind.user_ans,data.options,data.limit);
        var idFindLength=_.filter(data.options,function(x){
            return x.user_ans !='' || x.user_ans != false  ;
        });
        console.log(idFindLength.length, data.limit);
        if(ind.user_ans){
            return false ;
        }else{
            if(data.limit > idFindLength.length){
                console.log(ind.user_ans);
                return false ;
            }else{
                return true ;
            }
        }
    }
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
          case 6:
            var getLengthChcked=_.filter($scope.quedata[$scope.part]['quetions'][$scope.setParentInd]['options'],function(x){
                   return x.user_ans == true ;
            }).length;
            //console.log(getLengthChcked) ;

             var ind = 0
               if(getLengthChcked){
                     getLengthChcked = getLengthChcked-1 ;
               }
            // console.log($scope.quedata[$scope.part]['quetions'][$scope.setParentInd],$scope.quedata[$scope.part]['quetions'][$scope.setParentInd]['options']);
             $scope.reviewModel= $scope.quedata[$scope.part]['quetions'][$scope.setParentInd]['options'][getLengthChcked].isReview ;
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
          case 6:
            var getLengthChcked=_.filter($scope.quedata[$scope.part]['quetions'][$scope.setParentInd]['options'],function(x){
                   return x.user_ans == true ;
            }).length;
            //console.log(getLengthChcked) ;
             var ind = 0
               if(getLengthChcked){
                     getLengthChcked = $scope.quedata[$scope.part]['quetions'][$scope.setParentInd].limit - getLengthChcked  ;
               } 
               $scope.quedata[$scope.part]['quetions'][$scope.setParentInd]['options'][getLengthChcked].isReview = $scope.quedata[$scope.part]['quetions'][$scope.setParentInd]['options'][getLengthChcked].isReview ? false : true ;
               $scope.reviewModel= $scope.quedata[$scope.part]['quetions'][$scope.setParentInd]['options'][getLengthChcked].isReview ;
          break ;
        }
         return result;
     
    }
    $scope.countPart=function(part){
        return $scope.quedata[part]['quetions'].length +1 ;
    }
    
    test1Service.reading().then(function(response){
        $scope.loader=false;
        console.log(response);
        // $rootScope.toalObj=response.data;
        // $scope.quedata=response.data.reading
         $window.localStorage['toalObj'] = angular.toJson(response.data);
        console.log($window.localStorage['toalObj'].reading);
        $scope.totalobj=angular.fromJson($window.localStorage['toalObj']);
        $scope.quedata=$scope.totalobj.reading;
         console.log( $scope.quedata);   
         $timeout(function(){
            //    alert("enter in") ;
                var i=1 ;
                $('.part1a').each(function(){
                    // alert(i);
                   $(this).html(i++);
                });
               var j= i ;
                $('.part2a').each(function(){
                    $(this).html(j++);
                 });
                 var k= j ;
                 $('.part3a').each(function(){
                    $(this).html(k++);
                 });
            }, 1200);
                //Inter for every second
            $scope.startInterVel = $interval(function(){
                //Reading section ;
                if(saveData == 0){
                if($scope.totalReadingTime !=0){
                    $scope.totalReadingTime-- ;
                    //$cookieStore.put("readingTimer",$scope.totalReadingTime);
                }else{
                    console.log("Your time is up");
                    saveData = 1 ;
                    $window.localStorage['toalObj'] =  angular.toJson($scope.totalobj) ;
                    // console.log('enter result',$window.localStorage['toalObj']);
                    // console.log($scope.totalReadingTime);
                    if (angular.isDefined($scope.startInterVel)) {
                        $interval.cancel($scope.startInterVel);
                    }
                    $state.go('break',{"name":"sec4"});
                }
                }
            
        },1000);
    });

    $scope.gotToNext=function(){
       $window.localStorage['toalObj'] =  angular.toJson($scope.totalobj) ;
         // console.log('enter result',$window.localStorage['toalObj']);
        if (angular.isDefined($scope.startInterVel)) {
            $interval.cancel($scope.startInterVel);
        }
        $state.go('break',{"name":"sec4"});
    }
    // $timeout(function(){
    //     //    alert("enter in") ;
    //         var i=1 ;
    //         $('.part1a').each(function(){
    //             // alert(i);
    //            $(this).html(i++);
    //         });
    //        var j= i ;
    //         $('.part2a').each(function(){
    //             $(this).html(j++);
    //          });
    //          var k= j ;
    //          $('.part3a').each(function(){
    //             $(this).html(k++);
    //          });
    //     }, 1200);
    //     //$scope.quedata[$scope.part]['quetions'][1].isAttend();
    //     $cookieStore.put("timer",$scope.quedata.totaltime);
    //     // $scope.totalReadingTime=  $cookieStore.get("timer");
    //     //   console.log( $scope.totalReadingTime);

    //     //Inter for every second 
    //  $scope.startInterVel =   $interval(function(){
    //       //Reading section ;
    //       if($scope.totalReadingTime !=0){
    //          $scope.totalReadingTime-- ;
    //       }else{
    //          console.log("Your time is up"); 
    //          $interval.cancel($scope.startInterVel) ;
            
    //       //    $scope.loadNewParag() ;
    //       }
    //       //console.log( $scope.readingdata.reading);
    //     },1000)

    // function isAtttend(obj,type,index){
    $scope.isAtttend=function(obj,type,index){
     //  console.log(obj,type);
    //    alert("hello");
        var result ;
        switch(type){
          case 1: 
       //   console.log( obj.options);
           var getIndex=_.findIndex(obj.options,function(x){
            return x.user_ans != 0 ;
           });
     //     console.log(getIndex) ;
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
      //   console.log( obj );
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
          case 6: 
         console.log(obj,index);
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
        //    if(getArray.length == obj.indval){
        //     result = true ;
        //    }else{
        //     result =false ;
        //    }
          break ;    
        }
         return result;
    }
    $scope.changePart=function(part){
        $scope.part = part ;
        $(".points_table_scrollbar").animate({ scrollTop: $(".points_table_scrollbar")[0] }, 1000);
    }
    $scope.loadNewParag=function(){
        $scope.btndisable=true;
        var sendObj = {
              "useId": $cookieStore.get("loginAccess").id,
              "r1": "test1",
              "toalObj": $scope.toalObj
            }
            console.log(sendObj);
            test1Service.saveData(sendObj).then(function(res) {
          $scope.btndisable=false;
        //   $state.go('break',{"name":"sec4"});
         });
      }
    $scope.removeBox=function(input,data,id){
        $scope.quedata[$scope.part]['quetions'][$scope.getIdPart2()]['options'][id][input].splice(0, 1); 
        $scope.quedata[$scope.part]['quetions'][$scope.getIdPart2()]['rights'].push(data);
    }
    $scope.getIdPart2=function(box){
        console.log(box);
        var getIdPart2Type5=_.findIndex($scope.quedata[$scope.part]['quetions'],function(x){
            return x.boxname === box ;
        });
         return getIdPart2Type5 ;
    }
    $scope.MoveItem = function(origin, dest, item_id) {
    console.log(origin, dest, item_id)
      // Check if dropped in origin
      if (origin == dest) return;

        console.log(origin.search("uud"));
      //  if(origin === 'rights' ){
        if( origin.search("box") == 0 ){
            console.log($scope.getIdPart2(origin));
            console.log("rights to left") ;
            var findId=_.findIndex($scope.quedata[$scope.part]['quetions'][$scope.getIdPart2(origin)]['rights'],function(x){
                return x.id === item_id ;
            });
            //split
            var splitDest= dest.split("-") ;
            if(  $scope.quedata[$scope.part]['quetions'][$scope.getIdPart2(origin)]['options'][splitDest[1]][splitDest[0]].length == 0){
             var item =   $scope.quedata[$scope.part]['quetions'][$scope.getIdPart2(origin)]['rights'].splice(findId, 1);
                  $scope.quedata[$scope.part]['quetions'][$scope.getIdPart2(origin)]['options'][splitDest[1]][splitDest[0]].push(item[0]);
               // console.log($scope.quedata[$scope.part]['quetions'][$scope.getIdPart2()]['options'],item[0]);
            }else{
              var item =  $scope.quedata[$scope.part]['quetions'][$scope.getIdPart2(origin)]['rights'].splice(findId, 1);
                  $scope.quedata[$scope.part]['quetions'][$scope.getIdPart2(origin)]['rights'].push(  $scope.quedata[$scope.part]['quetions'][$scope.getIdPart2(origin)]['options'][splitDest[1]][splitDest[0]][0])
                  $scope.quedata[$scope.part]['quetions'][$scope.getIdPart2(origin)]['options'][splitDest[1]][splitDest[0]].splice(0, 1);
                  $scope.quedata[$scope.part]['quetions'][$scope.getIdPart2(origin)]['options'][splitDest[1]][splitDest[0]].push(item[0]);
            }
            console.log(findId);
            $scope.typeReviewRemainder(2,$scope.getIdPart2(origin),splitDest[1]) ;
        }
      //  if(dest ===  origin.search("box")){
        if(dest.search("box") == 0 ){
             console.log(dest);
            console.log("enter in left to right");
            var splitDest= origin.split("-") ;
            $scope.quedata[$scope.part]['quetions'][$scope.getIdPart2(dest)]['rights'].push(  $scope.quedata[$scope.part]['quetions'][$scope.getIdPart2(dest)]['options'][splitDest[1]][splitDest[0]][0]);
            $scope.quedata[$scope.part]['quetions'][$scope.getIdPart2(dest)]['options'][splitDest[1]][splitDest[0]].splice(0, 1); 
            $scope.typeReviewRemainder(2,$scope.getIdPart2(dest),splitDest[1]) ;
        }
        //Update UI
        $scope.$apply();
    }
      $(document).on('click','.clickExp',function(es){
        //  alert('enter in');
        var getCurr=  $(this).next('.slideDown').hasClass('ng-hide') ;      
        // console.log( ) ;
        $('.clickExp').each(function(key,val){
            $(this).addClass('expandcollapse-heading-collapsed');
            $(this).removeClass('expandcollapse-heading-expanded');
            $(this).next('.slideDown').addClass('ng-hide');
        });
        if(getCurr){
            $(this).removeClass('expandcollapse-heading-collapsed');
            $(this).addClass('expandcollapse-heading-expanded');
            $(this).next('.slideDown').removeClass('ng-hide');
        }else{
            $(this).addClass('expandcollapse-heading-collapsed');
            $(this).removeClass('expandcollapse-heading-expanded');
            $(this).next('.slideDown').addClass('ng-hide');
        }
        e.preventDefault();
    });
    // $(document).on('click','.clickExp',function(){
    //     // alert('enter in');
    //     var getCurr=  $(this).next('.slideDown').hasClass('ng-hide') ;      
    //     console.log( ) ;
    //     $('.clickExp').each(function(key,val){
    //         $(this).addClass('expandcollapse-heading-collapsed');
    //         $(this).removeClass('expandcollapse-heading-expanded');
    //         $(this).next('.slideDown').addClass('ng-hide');
    //     });
    //     if(getCurr){
    //         $(this).removeClass('expandcollapse-heading-collapsed');
    //         $(this).addClass('expandcollapse-heading-expanded');
    //         $(this).next('.slideDown').removeClass('ng-hide');
    //     }else{
    //         $(this).addClass('expandcollapse-heading-collapsed');
    //         $(this).removeClass('expandcollapse-heading-expanded');
    //         $(this).next('.slideDown').addClass('ng-hide');
    //     }
    // });
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
                //    alert("enter in") ;
                    var i=1 ;
                    $('.part1a').each(function(){
                        // alert(i);
                       $(this).html(i++);
                    });
                   var j= i ;
                    $('.part2a').each(function(){
                        $(this).html(j++);
                     });
                     var k= j ;
                     $('.part3a').each(function(){
                        $(this).html(k++);
                     });
                }, 400);

});