routerApp.controller('listeningCntrl', function($scope, $state, $window, $filter, $http, $interval,test1Service, $timeout, $cookieStore, reviewreadingService) {
    if ($cookieStore.get('loginAccess') == undefined) {
             $state.go('login');
         }
         $scope.active = true;
         $scope.active1 = true;
         $scope.getIndexQua11 = 0;
         $scope.totalReadingTime=60;
         $scope.actque=0;
         $scope.part="part1";
         $scope.reviewModel=9990;
       
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
               console.log($scope.quedata[$scope.part]['quetions'][$scope.setParentInd]['questions'][$scope.setindInd].isReview) ;
               $scope.reviewModel= $scope.quedata[$scope.part]['quetions'][$scope.setParentInd]['questions'][$scope.setindInd].isReview;
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
              
               $scope.quedata[$scope.part]['quetions'][$scope.setParentInd]['questions'][$scope.setindInd].isReview = $scope.quedata[$scope.part]['quetions'][$scope.setParentInd]['questions'][$scope.setindInd].isReview ? false : true ;
               $scope.reviewModel= $scope.quedata[$scope.part]['quetions'][$scope.setParentInd]['questions'][$scope.setindInd].isReview;
               console.log( $scope.reviewModel);
               break ;     
               case 5: 
               $scope.quedata[$scope.part]['quetions'][$scope.setParentInd]['options'][$scope.setindInd].isReview = $scope.quedata[$scope.part]['quetions'][$scope.setParentInd]['options'][$scope.setindInd].isReview ? false : true ;
               $scope.reviewModel= $scope.quedata[$scope.part]['quetions'][$scope.setParentInd]['options'][$scope.setindInd].isReview ;
               case 6:
                 var getLengthChcked=_.filter($scope.quedata[$scope.part]['quetions'][$scope.setParentInd]['options'],function(x){
                        return x.user_ans == true ;
                 }).length;
                 //console.log(getLengthChcked) ;
                  var ind = 0;
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
     
        $scope.index1=0 ;
        // $scope.quedata={
        //     "audiopath":"/uploads/1537965248.mp3",
        //     "totaltime": "60",
        //     "part1": {
        //         "paragraph": "",
        //         "title":"<p>SECTION - 1</p>",
        //         "topInst": "<i><b>Questions 1 - 10</b> </i>",
        //         "maintitle":"<p>Activities programme involving volunteers</p>",
        //         "quetions": [
        //             {
        //                 "name": "7.Do the following statements agree with the information given in Reading Passage 1 ? In boxes 7-13 on your answer sheet, write",
        //                 "noblk": 0,
        //                 "paragraph": "what is api",
        //                 "head":"<p>Monday evenings: computer training </p>",
        //                 "question_type_id": 2,
        //                 "category": "Math",
        //                 "istable":false,
        //                 "solutionVal": "",
        //                 "status": 1001,
        //                 "options": [
        //                     {
        //                         "iscircle":true,
        //                         "name": "<p>Training needed in how to produce&nbsp;&nbsp;<input ng-model='options.user_ans' ng-click='typeReviewRemainder(2,$parent.$index,$index)'  style='text-align: center;border: none; border-bottom: 1px solid; width: 155px;' placeholder='1' type='text' id='text_1' name='text1'> .</p>",
        //                         "is_answer": [
        //                             "",
        //                             "A"
        //                         ],
        //                         "isReview": false,
        //                         "user_ans": ""
        //                     }
                            
        //                 ]
        //             },
        //             {
        //                 "name": "5.Do the following statements agree with the information given in Reading Passage 1 ? In boxes 7-13 on your answer sheet, write",
        //                 "noblk": 0,
        //                 "paragraph": "what is api",
        //                 "head":"<p>Tuesday afternoons: singing </p>",
        //                 "question_type_id": 2,
        //                 "category": "Math",
        //                 "istable":false,
        //                 "solutionVal": "",
        //                 "status": 1001,
        //                 "options": [
        //                     {
        //                         "iscircle":true,
        //                         "head":"<p>Tuesday afternoons: singing </p>",
        //                         "name": "<p>Training needed in how to produce&nbsp;&nbsp;<input ng-model='options.user_ans' ng-click='typeReviewRemainder(2,$parent.$index,$index)'  style='text-align: center;border: none; border-bottom: 1px solid; width: 155px;' placeholder='2' type='text' id='text_1' name='text1'> .</p>",
        //                         "is_answer": [
        //                             "b",
        //                             "B"
        //                         ],
        //                         "isReview": false,
        //                         "user_ans": ""
        //                     }
                            
        //                 ]
        //             },
        //             {
        //                 "name": "7.Do the following statements agree with the information given in Reading Passage 1 ? In boxes 7-13 on your answer sheet, write",
        //                 "noblk": 0,
        //                 "paragraph": "",
        //                 "question_type_id": 2,
        //                 "head":"",
        //                 "istable":false,
        //                 "category": "Math",
        //                 "solutionVal": "",
        //                 "status": 1001,
        //                 "options": [
        //                     {
        //                         "iscircle":false,
        //                         "name": "<p>Thursday mornings: growing&nbsp;&nbsp;<input ng-model='options.user_ans' ng-click='typeReviewRemainder(2,$parent.$index,$index)'  style='text-align: center;border: none; border-bottom: 1px solid; width: 155px;' placeholder='3' type='text' id='text_3' name='text3'>  .</p>",
        //                         "is_answer": [
        //                             "",
        //                             "A"
        //                         ],
        //                         "isReview": false,
        //                         "user_ans": ""
        //                     },
        //                     {
        //                         "iscircle":true,
        //                         "name": "<p>The home doesn't have many &nbsp;&nbsp;<input ng-model='options.user_ans' ng-click='typeReviewRemainder(2,$parent.$index,$index)'  style='text-align: center;border: none; border-bottom: 1px solid; width: 155px;' placeholder='4' type='text' id='text_4' name='text4'>  for gardening .</p>",
        //                         "is_answer": [
        //                             "",
        //                             "A"
        //                         ],
        //                         "isReview": false,
        //                         "user_ans": ""
        //                     }
                            
        //                 ]
        //             },
        //             {
        //                 "name": "5.Do the following statements agree with the information given in Reading Passage 1 ? In boxes 7-13 on your answer sheet, write",
        //                 "noblk": 0,
        //                 "paragraph": "what is api",
        //                 "question_type_id": 2,
        //                 "head":"<p>Once a month: meeting for volunteers and staff </p>",
        //                 "category": "Math",
        //                 "istable":false,
        //                 "solutionVal": "",
        //                 "status": 1001,
        //                 "options": [
                            
        //                     {
        //                         "iscircle":true,
        //                         "head":"<p>Once a month: meeting for volunteers and staff </p>",
        //                         "subhead":"<p>Interview </p>",
        //                         "name": "<p> Go in on  &nbsp;&nbsp;<input ng-model='options.user_ans' ng-click='typeReviewRemainder(2,$parent.$index,$index)'  style='text-align: center;border: none; border-bottom: 1px solid; width: 155px;' placeholder='5' type='text' id='text_5' name='text5'>  any time  .</p>",
        //                         "is_answer": [
        //                             "",
        //                             "A"
        //                         ],
        //                         "isReview": false,
        //                         "user_ans": ""
        //                     },
        //                     {
        //                         "iscircle":true,
        //                         "name": "<p>Interview with assistant called &nbsp;&nbsp;<input ng-model='options.user_ans' ng-click='typeReviewRemainder(2,$parent.$index,$index)'  style='text-align: center;border: none; border-bottom: 1px solid; width: 155px;' placeholder='6' type='text' id='text_6' name='text6'> .</p>",
        //                         "is_answer": [
        //                             "",
        //                             "A"
        //                         ],
        //                         "isReview": false,
        //                         "user_ans": ""
        //                     },
        //                     {
        //                         "iscircle":true,
        //                         "name": "<p>Address of home: 73  &nbsp;&nbsp;<input ng-model='options.user_ans' ng-click='typeReviewRemainder(2,$parent.$index,$index)'  style='text-align: center;border: none; border-bottom: 1px solid; width: 155px;' placeholder='7' type='text' id='text_7' name='text7'> .</p>",
        //                         "is_answer": [
        //                             "",
        //                             "A"
        //                         ],
        //                         "isReview": false,
        //                         "user_ans": ""
        //                     }
                            
        //                 ]
        //             },
        //             {
        //                 "name": "6.Do the following statements agree with the information given in Reading Passage 1 ? In boxes 7-13 on your answer sheet, write",
        //                 "noblk": 0,
        //                 "paragraph": "what is api",
        //                 "question_type_id": 2,
        //                 "istable":false,
        //                 "head":"<p>'Open house' days  </p>",
        //                 "category": "Math",
        //                 "solutionVal": "",
        //                 "status": 1001,
        //                 "options": [
                            
        //                     {
        //                         "iscircle":true,
        //                         "name": "<p>  Agreed to help on   &nbsp;&nbsp;<input ng-model='options.user_ans' ng-click='typeReviewRemainder(2,$parent.$index,$index)'  style='text-align: center;border: none; border-bottom: 1px solid; width: 155px;' placeholder='8' type='text' id='text_8' name='text8'>  any time  .</p>",
        //                         "is_answer": [
        //                             "",
        //                             "A"
        //                         ],
        //                         "isReview": false,
        //                         "user_ans": ""
        //                     },
        //                     {
        //                         "iscircle":true,
        //                         "name": "<p>Interview with assistant called &nbsp;&nbsp;<input ng-model='options.user_ans' ng-click='typeReviewRemainder(2,$parent.$index,$index)'  style='text-align: center;border: none; border-bottom: 1px solid; width: 155px;' placeholder='9' type='text' id='text_9' name='text9'> .</p>",
        //                         "is_answer": [
        //                             "",
        //                             "A"
        //                         ],
        //                         "isReview": false,
        //                         "user_ans": ""
        //                     },
        //                     {
        //                         "iscircle":true,
        //                         "name": "<p>Address of home: 73  &nbsp;&nbsp;<input ng-model='options.user_ans' ng-click='typeReviewRemainder(2,$parent.$index,$index)'  style='text-align: center;border: none; border-bottom: 1px solid; width: 155px;' placeholder='10' type='text' id='text_10' name='text10'> .</p>",
        //                         "is_answer": [
        //                             "",
        //                             "A"
        //                         ],
        //                         "isReview": false,
        //                         "user_ans": ""
        //                     }
                            
        //                 ]
        //             }
        //         ]
        //     },
        //     "part2": {
        //       "paragraph": "",
        //       "title":"<p>SECTION - 2</p>",
        //       "topInst": "<i><b>Questions 11 - 15</b></i>",
        //       "instructions":"<i>Label the plan below. Write the correct letter, A – H, next to Questions 11 – 15</i>",
        //       "maintitle":"",
        //         "quetions": [
        //           {
        //             "question_type_id": 5,
        //             "isiamge": true,
        //             "imgpath": "/uploads/1542792217.jpg",
        //             "boxname": "box1",
        //             "rights": [
        //               {
        //                 "id": "red1",
        //                 "text": "A",
        //                 "content1":false
                        
        //               },
        //               {
        //                 "id": "red2",
        //                 "text": "B",
        //                 "content1":false
        //               },
        //               {
        //                 "id": "red3",
        //                 "text": "C",
        //                 "content1":false
        //               },
        //               {
        //                 "id": "red4",
        //                 "text": "D",
        //                 "content1":false
        //               },
        //               {
        //                 "id": "red5",
        //                 "text": "E",
        //                 "content1":false
        //               },
        //               {
        //                 "id": "red6",
        //                 "text": "F",
        //                 "content1":false
        //               }
        //             ],
        //             "options": [
        //               {
        //                 "id": "input11",
        //                 "paragraph": "11 Newspapers",
        //                 "input11": [
                          
        //                 ],
        //                 "isReview": false,
        //                 "is_answer": ""
        //               },
        //               {
        //                 "id": "input12",
        //                 "paragraph": "12 Computers",
        //                 "input12": [
                          
        //                 ],
        //                 "isReview": false,
        //                 "is_answer": ""
        //               },
        //               {
        //                 "id": "input13",
        //                 "paragraph": "13 Photocopier",
        //                 "input13": [
                          
        //                 ],
        //                 "isReview": false,
        //                 "is_answer": ""
        //               },
        //               {
        //                 "id": "input14",
        //                 "paragraph": "14 Cafe",
        //                 "input14": [
                          
        //                 ],
        //                 "isReview": false,
        //                 "is_answer": ""
        //               },
        //               {
        //                 "id": "input15",
        //                 "paragraph": "15 Sports Books",
        //                 "input15": [
                          
        //                 ],
        //                 "isReview": false,
        //                 "is_answer": ""
        //               }

        //             ]
        //           },
        //           {
        //             "name": "<p><b>Questions 16 - 20</b></p>",
        //             "title1":"<p>Complete the table below.</p>",
        //             "title2":"<p>Write ONE WORD ONLY for each answer.</p>",
        //             "question_type_id": 2,
        //             "head":"<p>Complete the table below. </p>",
        //             "category": "Math",
        //             "istable":true,
        //             "td1":"Name",
        //             "td2":"New responsibility",
        //             "solutionVal": "",
        //             "status": 1001,
        //             "options": [
                        
                      
        //                 {
        //                   "title":"<p>Jenny Reed</p>",
        //                   "name": "<p>Buying  &nbsp;&nbsp;<input ng-model='options.user_ans' ng-click='typeReviewRemainder(2,$parent.$index,$index)'  style='text-align: center;border: none; border-bottom: 1px solid; width: 155px;' placeholder='16' type='text' id='text_16' name='text16'> for the Centre.</p>",
        //                   "is_answer": [
        //                       "",
        //                       "A"
        //                   ],
        //                   "isReview": false,
        //                   "user_ans": ""
        //                 },
        //                 {
        //                   "title":"<p>Phil Penshurst</p>",
        //                   "name": "<p>Help with writing &nbsp;&nbsp;<input ng-model='options.user_ans' ng-click='typeReviewRemainder(2,$parent.$index,$index)'  style='text-align: center;border: none; border-bottom: 1px solid; width: 155px;' placeholder='17' type='text' id='text_17' name='text17'> for courses.</p>",
        //                   "is_answer": [
        //                       "",
        //                       "A"
        //                   ],
        //                   "isReview": false,
        //                   "user_ans": ""
        //                 },
        //                 {
        //                   "title":"<p>Tom Salisbury</p>",
        //                   "name": "<p>Information on topics related to the &nbsp;&nbsp;<input ng-model='options.user_ans' ng-click='typeReviewRemainder(2,$parent.$index,$index)'  style='text-align: center;border: none; border-bottom: 1px solid; width: 155px;' placeholder='18' type='text' id='text_18' name='text18'> .</p>",
        //                   "is_answer": [
        //                       "",
        //                       "A"
        //                   ],
        //                   "isReview": false,
        //                   "user_ans": ""
        //                 },
        //                 {
        //                   "title":"<p>Saeed Aktar</p>",
        //                   "name": "<p>Finding a &nbsp;&nbsp;<input ng-model='options.user_ans' ng-click='typeReviewRemainder(2,$parent.$index,$index)'  style='text-align: center;border: none; border-bottom: 1px solid; width: 155px;' placeholder='19' type='text' id='text_19' name='text19'> .</p>",
        //                   "is_answer": [
        //                       "",
        //                       "A"
        //                   ],
        //                   "isReview": false,
        //                   "user_ans": ""
        //                 },
        //                 {
        //                   "title":"<p>Shilpa Desai</p>",
        //                   "name": "<p>Help with  &nbsp;&nbsp;<input ng-model='options.user_ans' ng-click='typeReviewRemainder(2,$parent.$index,$index)'  style='text-align: center;border: none; border-bottom: 1px solid; width: 155px;' placeholder='20' type='text' id='text_20' name='text20'> .</p>",
        //                   "is_answer": [
        //                       "",
        //                       "A"
        //                   ],
        //                   "isReview": false,
        //                   "user_ans": ""
        //                 }
        //             ]
        //          }
        //         ]
        //       },
        //     "part3":{

        //       "paragraph": "",
        //       "title":"<p>SECTION - 3</p>",
        //       "topInst": "<i><b>Questions 21 - 30</b></i>",
              
        //       "instructions":"",
        //       "maintitle":"",
        //         "quetions": [
        //           {
        //             "question_type_id": 5,
        //             "isiamge": false,
        //             "imgpath": "/uploads/1522859539.jpg",
        //             "boxname": "box2",
        //             "title1":"<p>What helped Stewart with each of the following stages in making his training film for museum employees?</p>",
        //              "title2":"<p>Choose <b>SEVEN</b> answers from the box and write the correct letter, <b>A - I</b>, next to Questions 21-27.</p>",
        //             "rights": [
        //               {
        //                 "id": "red21",
        //                 "text": "A",
        //                 "content1":true,
        //                 "content":"A.advice from friends",
        //               },
        //               {
        //                 "id": "red22",
        //                 "text": "B",
        //                 "content1":true,
        //                 "content":"B.information on a website",
        //               },
        //               {
        //                 "id": "red23",
        //                 "text": "C ",
        //                 "content1":true,
        //                 "content":"C.being allowed extra time ",
        //               },
        //               {
        //                 "id": "red24",
        //                 "text": "D",
        //                 "content1":true,
        //                 "content":"D.meeting a professional film maker",
        //               },
        //               {
        //                 "id": "red25",
        //                 "text": "E",
        //                 "content1":true,
        //                 "content":"E.good weather conditions",
        //               },
        //               {
        //                 "id": "red26",
        //                 "text": "F",
        //                 "content1":true,
        //                 "content":"F.getting a better computer ",
        //               },
        //               {
        //                 "id": "red27",
        //                 "text": "G",
        //                 "content1":true,
        //                 "content":"G.support of a manager",
        //               },
        //               {
        //                 "id": "red28",
        //                 "text": "H",
        //                 "content1":true,
        //                 "content":"H.help from a family member",
        //               },
        //               {
        //                 "id": "red29",
        //                 "text": "I",
        //                 "content1":true,
        //                 "content":"I.work on a previous assignments",
        //               }
        //             ],
        //             "options": [
        //               {
        //                 "id": "input21",
        //                 "paragraph": "21 finding a location",
        //                 "input21": [
                          
        //                 ],
        //                 "isReview": false,
        //                 "is_answer": true
        //               },
        //               {
        //                 "id": "input22",
        //                 "paragraph": "22 deciding on equipment ",
        //                 "input22": [
                          
        //                 ],
        //                 "isReview": false
        //               },
        //               {
        //                 "id": "input23",
        //                 "paragraph": "23 writing the script",
        //                 "input23": [
                          
        //                 ],
        //                 "isReview": false
        //               },
        //               {
        //                 "id": "input24",
        //                 "paragraph": "24 casting",
        //                 "input24": [
                          
        //                 ],
        //                 "isReview": false
        //               },
        //               {
        //                 "id": "input25",
        //                 "paragraph": "25 filming",
        //                 "input25": [
                          
        //                 ],
        //                 "isReview": false
        //               },
        //               {
        //                 "id": "input26",
        //                 "paragraph": "26 editing",
        //                 "input26": [
                          
        //                 ],
        //                 "isReview": false
        //               },
        //               {
        //                 "id": "input27",
        //                 "paragraph": "27 designing the DVD cover",
        //                 "input27": [
                          
        //                 ],
        //                 "isReview": false
        //               }

        //             ]
        //           },
        //           {
        //             "name": "<p><b>Stewart's work placement: benefits to the Central Museum Association</b></p>",
        //             "title":"<p><b>Questions 27 - 30</b></p>",
        //             "title1":"<p>Complete the notes below.</p>",
        //             "title2":"<p>Write ONE<i>WORD ONLY</i>  for each answer.</p>",
        //             "question_type_id": 2,
        //             // "head":"<p>Complete the table below. </p>",
        //             "istable":false,
        //             "td1":"Name",
        //             "td2":"New responsibility",
        //             "solutionVal": "",
        //             "status": 1001,
        //             "options": [
                        
                      
        //                 {
        //                   "iscircle":true,
        //                   "name": "<p>his understanding of the Association's &nbsp;&nbsp;<input ng-model='options.user_ans' ng-click='typeReviewRemainder(2,$parent.$index,$index)'  style='text-align: center;border: none; border-bottom: 1px solid; width: 155px;' placeholder='28' type='text' id='text_28' name='text27'><br> <span><i class='fa fa-circle' aria-hidden='true'></i>&nbsp;</span>	the reduction in expense 	the reduction in expense </p>",
        //                   "is_answer": [
        //                       "",
        //                       "A"
        //                   ],
        //                   "isReview": false,
        //                   "user_ans": ""
        //                 },
        //                 {
        //                   "iscircle":true,
        //                   "name": "<p>increased co-operation between &nbsp;&nbsp;<input ng-model='options.user_ans' ng-click='typeReviewRemainder(2,$parent.$index,$index)'  style='text-align: center;border: none; border-bottom: 1px solid; width: 155px;' placeholder='29' type='text' id='text_28' name='text29'><br> </p>",
        //                   "is_answer": [
        //                       "",
        //                       "A"
        //                   ],
        //                   "isReview": false,
        //                   "user_ans": ""
        //                 },
        //                 {
        //                   "iscircle":true,
        //                   "name": "<p> continuous &nbsp;&nbsp;<input ng-model='options.user_ans' ng-click='typeReviewRemainder(2,$parent.$index,$index)'  style='text-align: center;border: none; border-bottom: 1px solid; width: 155px;' placeholder='30' type='text' id='text_30' name='text30'> 	which led to a better product <br> <span><i class='fa fa-circle' aria-hidden='true'></i>&nbsp;</span> 	ideas for distribution of the film</p>",
        //                   "is_answer": [
        //                       "",
        //                       "A"
        //                   ],
        //                   "isReview": false,
        //                   "user_ans": ""
        //                 }
        //             ]
        //          }
        //         ]
        //     },
        //     "part4":{
        //       "paragraph": "",
        //       "title":"<p>SECTION - 4</p>",
        //       "topInst": "<i><b>Questions 31 - 40</b> </i>",
        //       "maintitle":"<p>New Caledonian crows and the use of tools</p>",
        //       "quetions": [
        //           {
        //               "name": "",
        //               "noblk": 0,
        //               "paragraph": "what is api",
        //               "head":"<p><b>Examples of animals using tools </b></p>",
        //               "question_type_id": 2,
        //               "category": "Math",
        //               "istable":false,
        //               "solutionVal": "",
        //               "status": 1001,
        //               "options": [
        //                   {
        //                       "iscircle":true,
        //                       "name": "<p>some chimpanzees use stones to break nuts <br><br><span style='margin: 0px 0px 0px -20px;'><span><i class='fa fa-circle' aria-hidden='true'></i>&nbsp;</span>	Betty (New Caledonian crow) made a&nbsp;&nbsp;<input ng-model='options.user_ans' ng-click='typeReviewRemainder(2,$parent.$index,$index)'  style='text-align: center;border: none; border-bottom: 1px solid; width: 155px;' placeholder='31' type='text' id='text_31' name='text31'> .</span><br><br><span style='margin: 0px 0px 0px -20px;'><span><i class='fa fa-circle' aria-hidden='true'></i>&nbsp;</span>	Barney (New Caledonian crow) used sticks to find food</span></p>",
        //                       "is_answer": [
        //                           "",
        //                           "A"
        //                       ],
        //                       "isReview": false,
        //                       "user_ans": ""
        //                   }
                          
        //               ]
        //           },
        //           {
        //               "name": "5.Do the following statements agree with the information given in Reading Passage 1 ? In boxes 7-13 on your answer sheet, write",
        //               "noblk": 0,
        //               "paragraph": "what is api",
        //               "head":"<p><b>New Zealand and Oxford experiment</b></p>",
        //               "question_type_id": 2,
        //               "category": "Math",
        //               "istable":false,
        //               "solutionVal": "",
        //               "status": 1001,
        //               "options": [
        //                   {
        //                       "iscircle":true,
        //                       "name": "<p>three stages: crows needed to move a &nbsp;&nbsp;<input ng-model='options.user_ans' ng-click='typeReviewRemainder(2,$parent.$index,$index)'  style='text-align: center;border: none; border-bottom: 1px solid; width: 155px;' placeholder='32' type='text' id='text_32' name='text32'>&nbsp;in order to reach a short stick; then<BR><BR>use the short stick to reach a long stick; then use the long stick to reach food .</span></p>",
        //                       "is_answer": [
        //                           "b",
        //                           "B"
        //                       ],
        //                       "isReview": false,
        //                       "user_ans": ""
        //                   }
                          
        //               ]
        //           },
        //           {
        //               "name": "3.Do the following statements agree with the information given in Reading Passage 1 ? In boxes 7-13 on your answer sheet, write",
        //               "noblk": 0,
        //               "paragraph": "",
        //               "question_type_id": 2,
        //               "head":"<p><b>Oxford research</b></p>",
        //               "istable":false,
        //               "category": "Math",
        //               "solutionVal": "",
        //               "status": 1001,
        //               "options": [
                         
        //                   {
        //                       "iscircle":true,
        //                       "name": "<p>crows used sticks to investigate whether there was any  &nbsp;&nbsp;<input ng-model='options.user_ans' ng-click='typeReviewRemainder(2,$parent.$index,$index)'  style='text-align: center;border: none; border-bottom: 1px solid; width: 155px;' placeholder='33' type='text' id='text_33' name='text33'> from an object <br><br><span style='0 0 0 -20px'><span><i class='fa fa-circle' aria-hidden='true'></i>&nbsp;</span>•	research was inspired by seeing crows using tools on a piece of cloth to investigate a spider design<span></p>",
        //                       "is_answer": [
        //                           "",
        //                           "A"
        //                       ],
        //                       "isReview": false,
        //                       "user_ans": ""
        //                   },
        //                   {
        //                     "iscircle":true,
        //                     "name": "<p>Barney used a stick to investigate a snake made of   &nbsp;&nbsp;<input ng-model='options.user_ans' ng-click='typeReviewRemainder(2,$parent.$index,$index)'  style='text-align: center;border: none; border-bottom: 1px solid; width: 155px;' placeholder='34' type='text' id='text_34' name='text34'> </p>",
        //                     "is_answer": [
        //                         "",
        //                         "A"
        //                     ],
        //                     "isReview": false,
        //                     "user_ans": ""
        //                 },
        //                 {
        //                     "iscircle":true,
        //                     "name": "<p>Pierre used a stick to investigate a   &nbsp;&nbsp;<input ng-model='options.user_ans' ng-click='typeReviewRemainder(2,$parent.$index,$index)'  style='text-align: center;border: none; border-bottom: 1px solid; width: 155px;' placeholder='35' type='text' id='text_35' name='text35'> <br><br><span style='margin: 0px 0px 0px -20px;'><span><span><i class='fa fa-circle' aria-hidden='true'></i>&nbsp;</span>used a stick to investigate a metal toad</span><br><br><span style='margin: 0px 0px 0px -20px;'><span><span><i class='fa fa-circle' aria-hidden='true'></i>&nbsp;</span>the crows only used sticks for the first contact</span></p>",
        //                     "is_answer": [
        //                         "",
        //                         "A"
        //                     ],
        //                     "isReview": false,
        //                     "user_ans": ""
        //                 }

                          
        //               ]
        //           },
        //           {
        //             "name": "5.Do the following statements agree with the information given in Reading Passage 1 ? In boxes 7-13 on your answer sheet, write",
        //             "noblk": 0,
        //             "paragraph": "what is api",
        //             "head":"<p><b>Conclusions of above research</b></p>",
        //             "question_type_id": 2,
        //             "category": "Math",
        //             "istable":false,
        //             "solutionVal": "",
        //             "status": 1001,
        //             "options": [
        //                 {
        //                     "iscircle":true,
        //                     "name": "<p><span>ability to plan provides interesting evidence of the birds' cognition .<br><br></span> &nbsp;&nbsp;<span style='margin: 0px 0px 0px -20px;'><span><i class='fa fa-circle' aria-hidden='true'></i>&nbsp;</span></span></span>unclear whether this is evidence of the birds'<input ng-model='options.user_ans' ng-click='typeReviewRemainder(2,$parent.$index,$index)'  style='text-align: center;border: none; border-bottom: 1px solid; width: 155px;' placeholder='36' type='text' id='text_36' name='text36'>&nbsp;</span></p>",
        //                     "is_answer": [
        //                         "b",
        //                         "B"
        //                     ],
        //                     "isReview": false,
        //                     "user_ans": ""
        //                 }
                        
        //             ]
        //         },
        //         {
        //             "name": "3.Do the following statements agree with the information given in Reading Passage 1 ? In boxes 7-13 on your answer sheet, write",
        //             "noblk": 0,
        //             "paragraph": "",
        //             "question_type_id": 2,
        //             "head":"<p><b>Exeter and Oxford research in New Caledonia</b></p>",
        //             "istable":false,
        //             "category": "Math",
        //             "solutionVal": "",
        //             "status": 1001,
        //             "options": [
                       
        //                 {
        //                     "iscircle":true,
        //                     "name": "<p>Exeter and Oxford research in New Caledonia  &nbsp;&nbsp;<input ng-model='options.user_ans' ng-click='typeReviewRemainder(2,$parent.$index,$index)'  style='text-align: center;border: none; border-bottom: 1px solid; width: 155px;' placeholder='37' type='text' id='text_37' name='text37'> </p>",
        //                     "is_answer": [
        //                         "",
        //                         "A"
        //                     ],
        //                     "isReview": false,
        //                     "user_ans": ""
        //                 },
        //                 {
        //                   "iscircle":true,
        //                   "name": "<p>for the birds  &nbsp;&nbsp;<input ng-model='options.user_ans' ng-click='typeReviewRemainder(2,$parent.$index,$index)'  style='text-align: center;border: none; border-bottom: 1px solid; width: 155px;' placeholder='38' type='text' id='text_38' name='text38'>for the birds</p>",
        //                   "is_answer": [
        //                       "",
        //                       "A"
        //                   ],
        //                   "isReview": false,
        //                   "user_ans": ""
        //               },
        //               {
        //                   "iscircle":true,
        //                   "name": "<p>	larvae's specific   &nbsp;&nbsp;<input ng-model='options.user_ans' ng-click='typeReviewRemainder(2,$parent.$index,$index)'  style='text-align: center;border: none; border-bottom: 1px solid; width: 155px;' placeholder='39' type='text' id='text_39' name='text39'>	larvae's specific </p>",
        //                   "is_answer": [
        //                       "",
        //                       "A"
        //                   ],
        //                   "isReview": false,
        //                   "user_ans": ""
        //               },
        //               {
        //                 "iscircle":true,
        //                 "name": "<p>scientists will analyse what the birds include in their   &nbsp;&nbsp;<input ng-model='options.user_ans' ng-click='typeReviewRemainder(2,$parent.$index,$index)'  style='text-align: center;border: none; border-bottom: 1px solid; width: 155px;' placeholder='40' type='text' id='text_40' name='text40'> </p>",
        //                 "is_answer": [
        //                     "",
        //                     "A"
        //                 ],
        //                 "isReview": false,
        //                 "user_ans": ""
        //             }

                        
        //             ]
        //         }

        //       ]
        //     } 
        // }
       
     
     
     $scope.isAtttend=function(obj,type,index){
           //  console.log(obj,type);
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
               case 6: 
           //    console.log(obj,index);
               var getArrayTrueLength=_.filter(obj.options,function(x){
                 return x.user_ans == true ;
                }).length;
                var numOfLimit=obj.limit ;
         //      console.log(getArrayTrueLength,numOfLimit,index) ;
                if(index < getArrayTrueLength ){
                 result = true ;
                }else{
                 result = false ;
                }
           
               break ;    
             }
              return result;
         }
         $scope.changePart=function(part){
             $scope.part = part ;
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
 
 