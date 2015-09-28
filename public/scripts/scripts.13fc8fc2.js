"use strict";angular.module("tweadsApp",["ngAnimate","ngAria","ngCookies","ngMessages","ngResource","ngRoute","ngSanitize","ngTouch","ngStorage","ui.materialize","satellizer","angular-stripe","credit-cards","bd.form-state"]).config(["$routeProvider","$authProvider","$httpProvider","$provide","stripeProvider",function(a,b,c,d,e){function f(a,b){return{responseError:function(c){var d=b.get("$location"),e=b.get("$rootScope"),f=b.get("$auth"),g=["token_not_provided","token_expired","token_absent","token_invalid","Internal Server Error","Unauthorized"];return angular.forEach(g,function(a,b){if(c.statusText===a){e.authenticated=!1,delete e.$storage.user,f.logout();var g={status:"ERROR",message:"Something went wrong, please log in again."};console.log(g),d.path("/login")}}),a.reject(c)}}}e.setPublishableKey("pk_test_VZy9ghVSzKWmsFYaeCtVATZ6"),f.$inject=["$q","$injector"],d.factory("redirectWhenLoggedOut",f),c.interceptors.push("redirectWhenLoggedOut"),a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl",controllerAs:"main"}).when("/about",{templateUrl:"views/about.html",controller:"AboutCtrl",controllerAs:"about"}).when("/login",{templateUrl:"views/login.html",controller:"LoginCtrl",controllerAs:"login"}).when("/signup",{templateUrl:"views/signup.html",controller:"SignupCtrl",controllerAs:"signup"}).when("/logout",{templateUrl:"views/logout.html",controller:"LogoutCtrl",controllerAs:"logout"}).when("/profile",{templateUrl:"views/profile.html",controller:"ProfileCtrl",controllerAs:"profile"}).when("/pay",{templateUrl:"views/pay.html",controller:"PayCtrl",controllerAs:"pay"}).when("/dashboard",{templateUrl:"views/dashboard.html",controller:"DashboardCtrl",controllerAs:"dashboard"}).otherwise({redirectTo:"/"}),b.facebook({clientId:"657854390977827"}),b.google({clientId:"429673858105-8hjk4qonb299tsocgevvpjq5o1tolu4g.apps.googleusercontent.com"}),b.github({clientId:"73e1708345e680b2f8b2"}),b.linkedin({clientId:"77cw786yignpzj"}),b.yahoo({clientId:"dj0yJmk9SDVkM2RhNWJSc2ZBJmQ9WVdrOWIzVlFRMWxzTXpZbWNHbzlNQS0tJnM9Y29uc3VtZXJzZWNyZXQmeD0yYw--"}),b.twitter({url:"/auth/twitter"}),b.live({clientId:"000000004C12E68D"}),b.oauth2({name:"foursquare",url:"/auth/foursquare",clientId:"MTCEJ3NGW2PNNB31WOSBFDSAD4MTHYVAZ1UKIULXZ2CVFC2K",redirectUri:window.location.origin||window.location.protocol+"//"+window.location.host,authorizationEndpoint:"https://foursquare.com/oauth2/authenticate"}),b.httpInterceptor=!0,b.loginOnSignup=!0,b.baseUrl="/",b.loginRedirect="/profile",b.logoutRedirect="/login",b.signupRedirect="/",b.loginUrl="/auth/login",b.signupUrl="/auth/signup",b.loginRoute="/login",b.signupRoute="/signup",b.tokenRoot=!1,b.tokenName="token",b.tokenPrefix="tweads",b.unlinkUrl="/auth/unlink/",b.unlinkMethod="get",b.authHeader="Authorization",b.authToken="Bearer",b.withCredentials=!0,b.platform="browser",b.storage="localStorage",b.github({url:"/auth/github",authorizationEndpoint:"https://github.com/login/oauth/authorize",redirectUri:window.location.origin||window.location.protocol+"//"+window.location.host,scope:["user:email"],scopeDelimiter:" ",type:"2.0",popupOptions:{width:1020,height:618}})}]).run(["$rootScope","$location","$auth","$localStorage","Account",function(a,b,c,d,e){var f=c.isAuthenticated();a.$storage=d,a.logout=function(){a.authenticated=!1,delete a.$storage.user,c.logout();var b={status:"OK",message:"You've logged out!"};console.log(b)},f?f&&(a.authenticated=!0,a.$storage.user||e.getProfile().then(function(b){a.$storage.user=b})["catch"](function(a){console.log(a)})):(a.authenticated=!1,delete a.$storage.user)}]),angular.module("tweadsApp").controller("MainCtrl",["Twitter","$window",function(a,b){var c=this;c.exampleToast={duration:1e3,message:"You reached out!"},c.twitter=new a,c.tweets=null,c.outreaches=null,c.exampleTweet="",c.searchTerm="",c.progress={width:"0%"},c.step1=function(){c.progress.width="10%"},c.step2=function(){c.searchTerm.length&&(c.progress.width="37%")},c.step3=function(a){c.outreaches+=1,a.classes="light-green lighten-5",a.disabled=!0,b.Materialize.toast("You reached out!",3e3),c.progress.width="63%",c.step4()},c.step4=function(){c.outreaches>1&&(c.progress.width="100%")}}]),angular.module("tweadsApp").controller("AboutCtrl",function(){}),angular.module("tweadsApp").controller("LoginCtrl",["$scope","$auth","$window","$rootScope",function(a,b,c,d){var e=this;e.login=function(){b.login({email:e.email,password:e.password}).then(function(){d.authenticated=!0,c.Materialize.toast("You have successfully logged in",3e3)})["catch"](function(a){c.Materialize.toast(a.data.message,3e3)})},e.authenticate=function(a){b.authenticate(a).then(function(){c.Materialize.toast("You have successfully logged in",3e3)})["catch"](function(a){console.log(a)})}}]),angular.module("tweadsApp").controller("SignupCtrl",["$scope","$auth",function(a,b){var c=this;c.signup=function(){b.signup({displayName:c.displayName,email:c.email,password:c.password})["catch"](function(a){"object"==typeof a.data.message?angular.forEach(a.data.message,function(a){console.log({content:a[0],animation:"fadeZoomFadeDown",type:"material",duration:3})}):console.log({content:a.data.message,animation:"fadeZoomFadeDown",type:"material",duration:3})})}}]),angular.module("tweadsApp").controller("LogoutCtrl",["$auth",function(a){a.isAuthenticated()&&a.logout().then(function(){console.log({content:"You have been logged out",animation:"fadeZoomFadeDown",type:"material",duration:3})})}]),angular.module("tweadsApp").controller("ProfileCtrl",["$rootScope","$scope","$auth","Account","$http",function(a,b,c,d,e){var f=this;f.dump=function(){e.get("/twitter/dump").success(function(a){console.log(a)}).error(function(a){console.log({content:a,animation:"fadeZoomFadeDown",type:"material",duration:3})})},f.getProfile=function(){d.getProfile().success(function(b){f.user=b,a.$storage.user=b}).error(function(a){console.log({content:a.message,animation:"fadeZoomFadeDown",type:"material",duration:3})})},f.updateProfile=function(){d.updateProfile({displayName:f.user.displayName,email:f.user.email}).then(function(){a.$storage.user=angular.extend(a.$storage.user,f.user),console.log({content:"Profile has been updated",animation:"fadeZoomFadeDown",type:"material",duration:3})})},f.link=function(a){c.link(a).then(function(){console.log({content:"You have successfully linked "+a+" account",animation:"fadeZoomFadeDown",type:"material",duration:3})}).then(function(){f.getProfile()})["catch"](function(a){console.log({content:a.data.message,animation:"fadeZoomFadeDown",type:"material",duration:3})})},f.unlink=function(a){c.unlink(a).then(function(){console.log({content:"You have successfully unlinked "+a+" account",animation:"fadeZoomFadeDown",type:"material",duration:3})}).then(function(){f.getProfile()})["catch"](function(b){console.log({content:b.data?b.data.message:"Could not unlink "+a+" account",animation:"fadeZoomFadeDown",type:"material",duration:3})})},f.getProfile()}]),angular.module("tweadsApp").controller("PayCtrl",["$rootScope","$scope","$http","stripe","Account",function(a,b,c,d,e){var f=this;f.paid=!1,f.stripeCallback=function(a,b){b.error?(f.paid=!1,f.message="Error from Stripe.com"):e.getProfile().success(function(a){f.user=a;var d={token:b.id,customer_id:f.user.id,total:1e3};c.post("/api/subscribe",d).success(function(a){"OK"==a.status?(f.paid=!0,f.message=a.message):(f.paid=!1,f.message=a.message)})}).error(function(a){console.log("couldnt find user")})},b.charge=function(){return d.card.createToken(b.payment.card).then(function(d){console.log("token created for card ending in ",d.card.last4);var e=angular.copy(b.payment);return e.card=void 0,e.customer_id=a.$storage.user.id,e.token=d.id,e.total=1e3,c.post("/api/subscribe",e)}).then(function(a){console.log("successfully submitted payment for £",a.amount)})["catch"](function(a){a.type&&/^Stripe/.test(a.type)?console.log("Stripe error: ",a.message):console.log("Other error occurred, possibly with your API",a.message)})},f.init=function(){f.loaded=!0},f.init()}]),angular.module("tweadsApp").factory("Account",["$http",function(a){return{getProfile:function(){return a.get("/api/me")},updateProfile:function(b){return a.put("/api/me",b)}}}]),angular.module("tweadsApp").directive("passwordMatch",function(){return{require:"ngModel",scope:{otherModelValue:"=passwordMatch"},link:function(a,b,c,d){d.$validators.compareTo=function(b){return b===a.otherModelValue},a.$watch("otherModelValue",function(){d.$validate()})}}}),angular.module("tweadsApp").directive("passwordStrength",function(){return{restrict:"A",require:"ngModel",link:function(a,b,c,d){var e=b.children(),f=Array.prototype.slice.call(e.children()),g=f.slice(-1)[0],h=f.slice(-2),i=f.slice(-3),j=f.slice(-4);b.after(e),b.bind("keyup",function(){var a,b={positive:{},negative:{}},c={positive:{},negative:{}},e=0;angular.forEach(f,function(a){a.style.backgroundColor="#ebeef1"}),d.$viewValue&&(b.positive.lower=d.$viewValue.match(/[a-z]/g),b.positive.upper=d.$viewValue.match(/[A-Z]/g),b.positive.numbers=d.$viewValue.match(/\d/g),b.positive.symbols=d.$viewValue.match(/[$-/:-?{-~!^_`\[\]]/g),b.positive.middleNumber=d.$viewValue.slice(1,-1).match(/\d/g),b.positive.middleSymbol=d.$viewValue.slice(1,-1).match(/[$-/:-?{-~!^_`\[\]]/g),c.positive.lower=b.positive.lower?b.positive.lower.length:0,c.positive.upper=b.positive.upper?b.positive.upper.length:0,c.positive.numbers=b.positive.numbers?b.positive.numbers.length:0,c.positive.symbols=b.positive.symbols?b.positive.symbols.length:0,c.positive.numChars=d.$viewValue.length,a+=c.positive.numChars>=8?1:0,c.positive.requirements=a>=3?a:0,c.positive.middleNumber=b.positive.middleNumber?b.positive.middleNumber.length:0,c.positive.middleSymbol=b.positive.middleSymbol?b.positive.middleSymbol.length:0,b.negative.consecLower=d.$viewValue.match(/(?=([a-z]{2}))/g),b.negative.consecUpper=d.$viewValue.match(/(?=([A-Z]{2}))/g),b.negative.consecNumbers=d.$viewValue.match(/(?=(\d{2}))/g),b.negative.onlyNumbers=d.$viewValue.match(/^[0-9]*$/g),b.negative.onlyLetters=d.$viewValue.match(/^([a-z]|[A-Z])*$/g),c.negative.consecLower=b.negative.consecLower?b.negative.consecLower.length:0,c.negative.consecUpper=b.negative.consecUpper?b.negative.consecUpper.length:0,c.negative.consecNumbers=b.negative.consecNumbers?b.negative.consecNumbers.length:0,e+=4*c.positive.numChars,c.positive.upper&&(e+=2*(c.positive.numChars-c.positive.upper)),c.positive.lower&&(e+=2*(c.positive.numChars-c.positive.lower)),(c.positive.upper||c.positive.lower)&&(e+=4*c.positive.numbers),e+=6*c.positive.symbols,e+=2*(c.positive.middleSymbol+c.positive.middleNumber),e+=2*c.positive.requirements,e-=2*c.negative.consecLower,e-=2*c.negative.consecUpper,e-=2*c.negative.consecNumbers,b.negative.onlyNumbers&&(e-=c.positive.numChars),b.negative.onlyLetters&&(e-=c.positive.numChars),e=Math.max(0,Math.min(100,Math.round(e))),e>85?angular.forEach(j,function(a){a.style.backgroundColor="#008cdd"}):e>65?angular.forEach(i,function(a){a.style.backgroundColor="#6ead09"}):e>30?angular.forEach(h,function(a){a.style.backgroundColor="#e09115"}):g.style.backgroundColor="#e01414")})},template:'<span class="password-strength-indicator"><span></span><span></span><span></span><span></span></span>'}}),angular.module("tweadsApp").service("Twitter",["$http","$window",function(a,b){var c=this;c.tweets=[],c.busy=!1,c.outreaches=0,c.retweets=0,c.favourites=0,c.followed=0,c.status="",c.since_id=null,c.until=null,c.max_id=null,c.count=100,c.q="",c.result_type="mixed",c.searchTweets=function(){if(!c.busy){c.busy=!0;var d="/twitter/search";a({url:d,method:"GET",params:{q:c.q,result_type:c.result_type||"mixed",count:c.count||100,since_id:c.since_id||null,max_id:c.max_id||null}}).then(function(a){var b=a.data.statuses;console.log("newTweets: "),console.log(b);for(var d=0;d<b.length;d++)c.tweets.push(b[d]);c.since_id=c.tweets[c.tweets.length-1].id_str,c.busy=!1},function(a){console.log(a),angular.forEach(a.data.errors,function(a,c){b.Materialize.toast(a.message,3e3)})})}},c.tweet=function(d){if(!c.busy){c.busy=!0;var e="/twitter/tweet";a({url:e,method:"POST",data:{recipient:d||null,status:c.status||"@_tweads Help! I think I'm using this wrong!"}}).then(function(a){console.log(a),b.Materialize.toast("Twead-ed!",3e3),c.outreaches+=1,c.busy=!1},function(a){console.log(a),angular.forEach(a.data.errors,function(a,c){b.Materialize.toast(a.message,3e3)})})}},c.retweet=function(d){if(!c.busy){c.busy=!0;var e="/twitter/retweet";a({url:e,method:"POST",data:{id:d||0}}).then(function(a){console.log(a),b.Materialize.toast("Retweeted!",3e3),c.retweets+=1,c.busy=!1},function(a){console.log(a),angular.forEach(a.data.errors,function(a,c){b.Materialize.toast(a.message,3e3)})})}},c.favourite=function(d){if(!c.busy){c.busy=!0;var e="/twitter/favourite";a({url:e,method:"POST",data:{id:d||0}}).then(function(a){console.log(a),b.Materialize.toast("Favourited!",3e3),c.favourites+=1,c.busy=!1},function(a){console.log(a),angular.forEach(a.data.errors,function(a,c){b.Materialize.toast(a.message,3e3)})})}},c.followUser=function(d){if(!c.busy){c.busy=!0;var e="/twitter/follow";a({url:e,method:"POST",data:{screen_name:d||"@_tweads"}}).then(function(a){console.log(a),b.Materialize.toast("Followed!",3e3),c.followed+=1,c.busy=!1},function(a){console.log(a),angular.forEach(a.data.errors,function(a,c){b.Materialize.toast(a.message,3e3)})})}},c.getLatestTweets=function(){},c.nextPage=function(){if(!c.busy){c.busy=!0;var d="exampleTweets.json";a({url:d,method:"GET",params:{count:100}}).then(function(a){var b=a.data.statuses;console.log("tweets: "),console.log(b);for(var d=0;d<b.length;d++)c.tweets.push(b[d]);c.since_id=c.tweets[c.tweets.length-1],c.busy=!1},function(a){console.log(a),angular.forEach(a.data.errors,function(a,c){b.Materialize.toast(a.message,3e3)})})}}}]),angular.module("tweadsApp").controller("DashboardCtrl",["Twitter","$window",function(a,b){var c=this;c.twitter=a,c.getUserClass=function(a){return{"border-left":"solid 2px","border-left-color":"#"+a}}}]),angular.module("tweadsApp").filter("timestampToISO",function(){return function(a){return a=new Date(a).toISOString()}}),angular.module("tweadsApp").directive("loading",["$http",function(a){return{restrict:"A",link:function(b,c,d){b.isLoading=function(){return a.pendingRequests.length>0},b.$watch(b.isLoading,function(a){a?c.show():c.hide()})}}}]),angular.module("tweadsApp").directive("navLinks",function(){return{restrict:"E",template:'<li class=""><a title="Tweads Home Page" href="#/">Home</a></li><li class=""><a title="About Social Media Marketing" href="#/about">About</a></li><li class="" ng-show="!authenticated"><a title="Sign up to Tweads" href="#/signup">Sign Up</a> </li><li class="" ng-show="authenticated"><a title="Log out of Tweads" ng-click="logout();">Log Out</a></li><li class=""  ng-show="authenticated"><a title="About Social Media Marketing" href="#/profile">Profile</a> </li><li class="" ng-show="authenticated"><a title="About Social Media Marketing" href="#/dashboard">Dashboard</a> </li><li class=""  ng-show="authenticated"><a title="About Social Media Marketing" href="#/pay">Pay</a> </li><li class="" ng-show="!authenticated"><a title="Log in to Tweads" href="#/login">Log In</a> </li><li class=""><a title="Contact Tweads" href="#/contact">Contact</a> </li>'}}),angular.module("tweadsApp").directive("helloUser",function(){return{restrict:"E",template:'<ul ng-show="$storage.user.displayName" class="left hide-on-med-and-down"><li class=""><a href="#/profile" >Hello {{$storage.user.displayName}}</a></li></ul>'}}),angular.module("tweadsApp").run(["$templateCache",function(a){a.put("views/about.html","<p>This is the about view.</p>"),a.put("views/dashboard.html",'<div class="section"> <div class="row"> <div class="col l11 s12"> <div class="card-panel"> <h4 class="grey-text darken-2 light">Give It Try</h4> <div class="row"> <form name="exampleSearchForm"> <input-field class="col s12 m7"> <i class="material-icons prefix">search</i> <input name="searchTerm" required ng-minlength="1" ng-maxlength="120" ng-model="dashboard.twitter.q" type="text" class="validate"> <label for="icon_prefix"></label> </input-field> <div class="col s12 m5"> <button ng-disabled="exampleSearchForm.$invalid || exampleSearchForm.$pending" ng-click="dashboard.twitter.searchTweets()" class="btn-large purple waves-effect waves-light"> <span>Search</span> </button> </div> </form> <h1>{{dashboard.twitter.outreaches}}</h1> <form name="exampleTweet"> <input-field class="col s12 m7"> <i class="material-icons prefix">mode_edit</i> <textarea required ng-minlength="1" ng-maxlength="120" length="120" id="exampleTweet" ng-model="dashboard.twitter.status" ng-change="" type="text" placeholder="Hey I\'m Lewis from Tweads.com, Can I have a chat with you about how you currently market?" class="materialize-textarea"></textarea> <label for="icon_prefix2">Message</label> </input-field> <div class="col s12 m5"> <button ng-disabled="exampleTweet.$invalid || exampleTweet.$pending" ng-click="dashboard.twitter.tweet()" class="btn-large blue waves-effect waves-light"> <span>Tweet</span> </button> </div> </form> </div> </div> <div class="card-panel"> <div class="row"> <div class="col s12"> <ul ng-show="dashboard.twitter.tweets.length" class="collection"> <li ng-repeat="tweet in dashboard.twitter.tweets track by $index" ng-style="dashboard.getUserClass(tweet.user.profile_sidebar_fill_color)" class="collection-item avatar" ng-class="tweet.classes"> <img ng-src="{{tweet.user.profile_image_url}}" alt="" class="circle"> <span class="blue-text text-darken-2 title"> {{tweet.user.name}} <small>@{{tweet.user.screen_name}}</small> </span> <p> {{tweet.text}} </p> <div class="secondary-content"> <a ng-click="dashboard.moreInfo(tweet)" class="waves-effect waves-light pink-text"> <i class="material-icons">info</i> </a> <a ng-click="dashboard.twitter.retweet(tweet.id_str)" ng-class="{ \'green-text\': tweet.retweeted}" class="waves-effect waves-light"> <i class="material-icons">autorenew</i> </a> <a ng-click="dashboard.twitter.favourite(tweet.id_str)" ng-class="{ \'amber-text\': tweet.favourited}" class="waves-effect waves-light"> <i class="material-icons">star</i> </a> <a ng-click="dashboard.twitter.followUser(tweet.screen_name)" ng-class="{ \'blue-text\': tweet.user.following}" class="waves-effect waves-light"> <i class="material-icons">person_add</i> </a> <button ng-disabled="tweet.disabled" class="waves-effect waves-light purple btn" ng-click="dashboard.step3(tweet)"> <i class="material-icons">send</i> </button> </div> </li> </ul> <!-- Accordion cards, problem that secondary-content isn\'t reliable in the headers --> <!-- could go for user info + send button + outreach count in accordion body --> <!--\n<ul ng-show="dashboard.twitter.tweets.length" \nclass="collapsible popout" \ndata-collapsible="accordion" \nwatch>\n<li ng-repeat="tweet in dashboard.twitter.tweets track by $index">\n<div class="collapsible-header waves-effect waves-purple">\n{{tweet.text}}\n<a href="" class="secondary-content btn waves-effect waves-teal">\n<i class="material-icons">send</i>\n</a>\n</div>\n<div class="collapsible-body">\n<p>@{{tweet.user.screen_name}}</p>\n<p>{{tweet.user.name}}</p>\n<a href="" class="btn waves-effect waves-teal">\n<i class="material-icons">send</i>\n</a>\n</div>\n</li>\n</ul>\n--> <div ng-hide="dashboard.twitter.tweets.length" class="no-results"> <p>Nothing to show..</p> </div> </div> </div> </div> </div> </div> </div>'),a.put("views/login.html",'<div class="row"> <div class="col s12 offset-m3 m6"> <div class="card-panel"> <h3>Login</h3> <form> <div class="form-group input-field"> <input id="email" type="email" class="form-control validate" ng-model="login.auth.email"> <label for="email">Email</label> </div> <div class="form-group input-field"> <input id="password" type="text" class="form-control validate" ng-model="login.auth.password" length="30"> <label for="password">Password</label> </div> <button class="btn-large pink accent-1 waves-effect waves-light" ng-click="login.auth.forgotten()">I Forgot..</button> <button class="right btn-large green lighten-1 waves-effect waves-light" ng-click="login.auth.login()">Submit</button> </form> </div> </div> </div> <div class="container"> <div class="row"> <div class="center-form panel"> <div class="panel-body"> <h2 class="text-center">Log in</h2> <form method="post" ng-submit="login.login()" name="loginForm"> <div class="form-group has-feedback"> <input class="form-control input-lg" type="text" name="email" ng-model="login.email" placeholder="Email" required autofocus> <span class="ion-at form-control-feedback"></span> </div> <div class="form-group has-feedback"> <input class="form-control input-lg" type="password" name="password" ng-model="login.password" placeholder="Password" required> <span class="ion-key form-control-feedback"></span> </div> <button type="submit" ng-disabled="loginForm.$invalid" class="btn btn-lg btn-block btn-success">Log in</button> <br> <p class="text-center"> <a href="#">Forgot your password?</a> </p> <p class="text-center text-muted"> <small>Don\'t have an account yet? <a href="/#/signup">Sign up</a></small> </p> <div class="signup-or-separator"> <h6 class="text">or</h6> <hr> </div> </form> <button class="btn btn-block btn-facebook" ng-click="login.authenticate(\'facebook\')"> <i class="ion-social-facebook"></i> Sign in with Facebook </button> <button class="btn btn-block btn-google-plus" ng-click="login.authenticate(\'google\')"> <span class="ion-social-googleplus"></span>Sign in with Google </button> <button class="btn btn-block btn-linkedin" ng-click="login.authenticate(\'linkedin\')"> <i class="ion-social-linkedin"></i> Sign in with LinkedIn </button> <button class="btn btn-block btn-twitter" ng-click="login.authenticate(\'twitter\')"> <i class="ion-social-twitter"></i> Sign in with Twitter </button> <button class="btn btn-block btn-foursquare" ng-click="login.authenticate(\'foursquare\')"> <i class="fa fa-foursquare"></i> Sign in with Foursquare </button> <button class="btn btn-block btn-github" ng-click="login.authenticate(\'github\')"> <i class="ion-social-github"></i> Sign in with GitHub </button> <button class="btn btn-block btn-yahoo" ng-click="login.authenticate(\'yahoo\')"> <i class="ion-social-yahoo"></i> Sign in with Yahoo </button> <button class="btn btn-block btn-live" ng-click="login.authenticate(\'live\')"> <i class="ion-social-windows"></i> Sign in with Windows Live </button> </div> </div> </div> </div>'),a.put("views/logout.html","<p>This is the logout view.</p>"),a.put("views/main.html",'<div id="index-banner" class="parallax-container paralax-container-main"> <div class="section no-pad-bot"> <div class="container"> </div> </div> </div> <div class="section no-pad-bot" style="margin-top: -5%"> <div class="row"> <div class="col offset-l1 l10 s12 white z-depth-1"> <article id="post-5" class="valign-wrapper post-5 page type-page status-publish hentry"> <div class="col l2 m4 s6"> <img src="images/flat_apple_mac.112c4812.png" class="valign responsive-img"> </div> <div class="entry-content"> <div class="col l10 m8 s12"> <span class="blue-text"> <h4 class="grey-text darken-2 light"> Tweads </h4> <h5 class="grey-text darken-2 light">Generate leads for your business</h5> <p> <a class="waves-effect waves-light btn-large light-green darken-1" href="#/signup"> <i class="mdi-av-play-shopping-bag left"></i> Start Tweading Now! </a> <a class="waves-effect waves-light btn-large teal" href=""> <i class="mdi-action-credit-card left"></i> Buy Pro £XX.XX* </a> <br> <span style="font-size:0.5em"> *Plus tax where applicable </span> </p> <p class="grey-text darken-3"> Low effort. reuse messages 1 click contacting reach out generate buzz leads contact </p> <p class="grey-text darken-3"> Thundercats cornhole narwhal next level try-hard. Scenester food truck shabby chic, pickled sartorial Thundercats 3 wolf moon flexitarian heirloom. </p> <p> <a class="waves-effect waves-light btn-large light-blue darken-3" href=""> <i class="mdi-image-photo-camera left"></i> Screenshots </a> </p> </span> </div> </div> </article> </div> </div> </div> <div class="section"> <div class="row"> <div class="col offset-l1 l10 s12"> <div class="card-panel"> <h4 class="grey-text darken-2 light">How it works</h4> <ul class="tabs" tabs> <li class="tab col s3"><a class="active" href="#test1">Connect</a> </li> <li class="tab col s3"><a href="#test2">Website</a> </li> <li class="tab col s3"><a href="#test3">Mobile</a> </li> <li class="tab col s3"><a href="#test4">Control</a> </li> </ul> <div id="test1"> <div class="icon-block"> <h2 class="center light-blue-text"><i class="large material-icons">group_add</i></h2> <h5 class="blue-text center">Connect</h5> <p class="light">We have provided detailed documentation as well as specific code examples to help new users get started. We are also always open to feedback and can answer any questions a user may have main Materialize.</p> </div> </div> <div id="test2"> <div class="icon-block"> <h2 class="center light-blue-text"><i class="large material-icons">web</i></h2> <h5 class="blue-text center">Website</h5> <p class="light">We did most of the heavy lifting for you to provide a default stylings that incorporate our custom components. Additionally, we refined animations and transitions to provide a smoother experience for developers.</p> </div> </div> <div id="test3"> <div class="icon-block"> <h2 class="center light-blue-text"><i class="large material-icons">stay_current_portrait</i></h2> <h5 class="blue-text center">Mobile</h5> <p class="light">By utilizing elements and principles of Material Design, we were able to create a framework that incorporates components and animations that provide more feedback to users. Additionally, a single underlying responsive system across all platforms allow for a more unified user experience.</p> </div> </div> <div id="test4"> <div class="icon-block"> <h2 class="center light-blue-text"><i class="large material-icons">settings</i></h2> <h5 class="blue-text center">Control</h5> <p class="light">We have provided detailed documentation as well as specific code examples to help new users get started. We are also always open to feedback and can answer any questions a user may have main Materialize.</p> </div> </div> </div> </div> </div> </div> <div class="section"> <div class="row hide-on-med-and-down"> <div class="offset-s2 col s2 center-align"> Search </div> <div class="col s2 center-align"> Plan A Message </div> <div class="col s2 center-align"> Make Contact </div> <div class="col s2 center-align"> Re-use Your Message with 1 click </div> <div class="offset-s2 col s8"> <div class="progress"> <div class="determinate" ng-style="main.progress"> </div> </div> </div> </div> <div class="row"> <div class="col offset-l1 l10 s12"> <div class="card-panel"> <h4 class="grey-text darken-2 light">Give It Try</h4> <div class="row"> <form name="exampleSearchForm"> <input-field class="col s4"> <i class="material-icons prefix">search</i> <input name="searchTerm" required ng-minlength="1" ng-maxlength="120" ng-model="main.searchTerm" type="text" class="validate"> <label for="icon_prefix"></label> </input-field> <div class="col s2"> <button ng-disabled="exampleSearchForm.$invalid || exampleSearchForm.$pending" ng-click="[main.step1(), main.twitter.nextPage()]" class="btn-large blue waves-effect waves-light"> <span>Go!</span> </button> </div> </form> <input-field class="col s6"> <i class="material-icons prefix">mode_edit</i> <textarea required ng-minlength="1" ng-maxlength="120" length="120" id="exampleTweet" ng-model="main.exampleTweet" ng-change="main.step2()" type="text" placeholder="Hey I\'m Lewis from Tweads.com, Can I have a chat with you about how you currently market?" class="materialize-textarea"></textarea> <label for="icon_prefix2">Message</label> </input-field> </div> </div> <div class="card-panel"> <div class="row"> <div class="col s12"> <h1>EXAMPLES OR SCREENS OR SOMETHING HERE?! </h1> </div> </div> </div> </div> </div> </div>'),a.put("views/pay.html",'<h1>NEW FORM HTML</h1> <form bd-submit="charge()" name="paymentForm"> <select ng-model="payment.cardType" ng-options="type for type in [\'Visa\', \'American Express\', \'MasterCard\']"></select> <input type="text" ng-model="payment.card.number" name="cardNumber" cc-number cc-type="payment.cardType"> <p ng-show="paymentForm.cardNumber.$error.ccNumberType">That\'s not a valid {{payment.cardType}}</p> <p>CVC</p> <input type="text" ng-model="payment.card.cvc" cc-type="cardNumber.$ccType"> <div cc-exp> <p>Month</p> <input ng-model="payment.card.exp_month" cc-exp-month> <p>Year</p> <input ng-model="payment.card.exp_year" cc-exp-year> </div> <button class="btn-large" submit-button pending="Submitting...">Submit</button> </form> <h1>OLD FORM HTML</h1> <form stripe-form="pay.stripeCallback" name="checkoutForm"> <input ng-model="pay.number" placeholder="Card Number" payments-format="card" payments-validate="card" name="card"> <input ng-model="pay.expiry" placeholder="Expiration" payments-format="expiry" payments-validate="expiry" name="expiry"> <input ng-model="pay.cvc" placeholder="CVC" payments-format="cvc" payments-validate="cvc" name="cvc"> <button type="submit">Submit</button> </form> <div class="row" ng-if="pay.paid"> <div class="col s12 m4"> <div class="card-panel"> <h2><p>{{pay.message}}</p></h2> </div> </div> </div>'),a.put("views/profile.html",'<div class="section"> <div class="row"> <div class="col offset-l1 l10 s12"> <div class="card-panel"> <h5 ng-show="profile.authenticated">Welcome, {{profile.currentUser.name}}</h5> <h3>Users</h3> <div class="buttons" style="margin-bottom: 10px"> <button class="btn btn-primary" ng-click="profile.dump()">Dump</button> <button class="btn btn-primary" ng-click="profile.user.getUsers()">Get Users!</button> <button class="btn btn-danger" ng-click="profile.user.logout()">Logout</button> </div> <div class="alert alert-danger" ng-if="profile.user.error"> <strong>There was an error: </strong> {{profile.user.error.error}} <br>Please go back and login again </div> </div> <ul class="collapsible" ng-if="profile.user.users" data-collapsible="accordion" watch> <li ng-repeat="user in profile.user.users"> <div class="collapsible-header collection-item"> <i class="material-icons">person_pin</i> {{profile.user.name}} </div> <div class="collapsible-body"> <p> <span class="blue-text">Email: </span> {{profile.user.email}} </p> </div> </li> </ul> </div> </div> </div> <div class="section"> <div class="row"> <div class="col s12 m6"> <div class="card blue-grey lighten-4"> <form method="post" ng-submit="profile.updateProfile()"> <div class="card-content white-text"> <span class="card-title">Profile</span> <div class="form-group"> <label class="control-label">Profile Picture</label> <img class="profile-picture" ng-src="{{profile.user.picture || \'http://placehold.it/100x100\'}}"> </div> <input-field> <i class="material-icons prefix">perm_identity</i> <input required ng-minlength="1" ng-maxlength="120" length="120" type="text" ng-model="profile.user.displayName"> <label for="icon_prefix">Display Name</label> </input-field> <input-field> <i class="material-icons prefix">email</i> <input required ng-minlength="1" ng-maxlength="320" length="320" type="email" ng-model="profile.user.email"> <label for="icon_prefix">Email Address</label> </input-field> </div> <div class="card-action"> <button class="btn btn-lg purple">Update Information</button> </div> </form> </div> </div> </div> </div> <div class="section"> <div class="row"> <div class="col s12 m6"> <div class="card blue-grey lighten-4"> <div class="card-content white-text"> <span class="card-title">Linked Accounts</span> <button class="waves-effect waves-light btn purple" ng-if="profile.user.facebook" ng-click="profile.unlink(\'facebook\')"> <i class="ion-social-facebook"></i> Unlink Facebook Account </button> <button class="waves-effect waves-light btn teal" ng-if="!profile.user.facebook" ng-click="profile.link(\'facebook\')"> <i class="ion-social-facebook"></i> Link Facebook Account </button> <button class="waves-effect waves-light btn purple" ng-if="profile.user.google" ng-click="profile.unlink(\'google\')"> <i class="ion-social-googleplus"></i> Unlink Google Account </button> <button class="waves-effect waves-light btn teal" ng-if="!profile.user.google" ng-click="profile.link(\'google\')"> <i class="ion-social-googleplus"></i> Link Google Account </button> <button class="waves-effect waves-light btn purple" ng-if="profile.user.linkedin" ng-click="profile.unlink(\'linkedin\')"> <i class="ion-social-linkedin"></i> Unlink LinkedIn Account </button> <button class="waves-effect waves-light btn teal" ng-if="!profile.user.linkedin" ng-click="profile.link(\'linkedin\')"> <i class="ion-social-linkedin"></i> Link LinkedIn Account </button> <button class="waves-effect waves-light btn purple" ng-if="profile.user.twitter" ng-click="profile.unlink(\'twitter\')"> <i class="ion-social-twitter"></i> Unlink Twitter Account </button> <button class="waves-effect waves-light btn teal" ng-if="!profile.user.twitter" ng-click="profile.link(\'twitter\')"> <i class="ion-social-twitter"></i> Link Twitter Account </button> <button class="waves-effect waves-light btn purple" ng-if="profile.user.github" ng-click="profile.unlink(\'github\')"> <i class="ion-social-github"></i> Unlink GitHub Account </button> <button class="waves-effect waves-light btn teal" ng-if="!profile.user.github" ng-click="profile.link(\'github\')"> <i class="ion-social-github"></i> Link GitHub Account </button> <button class="waves-effect waves-light btn purple" ng-if="profile.user.foursquare" ng-click="profile.unlink(\'foursquare\')"> <i class="ion-social-foursquare"></i> Unlink Foursquare Account </button> <button class="waves-effect waves-light btn teal" ng-if="!profile.user.foursquare" ng-click="profile.link(\'foursquare\')"> <i class="ion-social-foursquare"></i> Link Foursquare Account </button> <button class="waves-effect waves-light btn purple" ng-if="profile.user.yahoo" ng-click="profile.unlink(\'yahoo\')"> <i class="ion-social-yahoo"></i> Unlink Yahoo Account </button> <button class="waves-effect waves-light btn teal" ng-if="!profile.user.yahoo" ng-click="profile.link(\'yahoo\')"> <i class="ion-social-yahoo"></i> Link Yahoo Account </button> <button class="waves-effect waves-light btn purple" ng-if="profile.user.live" ng-click="profile.unlink(\'live\')"> <i class="ion-social-windows"></i> Unlink Windows Live Account </button> <button class="waves-effect waves-light btn teal" ng-if="!profile.user.live" ng-click="profile.link(\'live\')"> <i class="ion-social-windows"></i> Link Windows Live Account </button> </div> <div class="card-action"> </div> </div> </div> </div> </div>'),
a.put("views/signup.html",'<div class="container"> <div class="row"> <div class="center-form panel"> <div class="panel-body"> <h2 class="text-center">Sign up</h2> <form method="post" ng-submit="signup.signup()" name="signupForm"> <div class="form-group has-feedback" ng-class="{ \'has-error\' : signupForm.displayName.$invalid && signupForm.displayName.$dirty }"> <input class="form-control input-lg" type="text" name="displayName" ng-model="signup.displayName" placeholder="Name" required autofocus> <span class="ion-person form-control-feedback"></span> <div class="help-block text-danger" ng-if="signupForm.displayName.$dirty" ng-messages="signupForm.displayName.$error"> <div ng-message="required">You must enter your name.</div> </div> </div> <div class="form-group has-feedback" ng-class="{ \'has-error\' : signupForm.email.$invalid && signupForm.email.$dirty }"> <input class="form-control input-lg" type="email" id="email" name="email" ng-model="signup.email" placeholder="Email" required> <span class="ion-at form-control-feedback"></span> <div class="help-block text-danger" ng-if="signupForm.email.$dirty" ng-messages="signupForm.email.$error"> <div ng-message="required">Your email address is required.</div> <div ng-message="pattern">Your email address is invalid.</div> </div> </div> <div class="form-group has-feedback" ng-class="{ \'has-error\' : signupForm.password.$invalid && signupForm.password.$dirty }"> <input password-strength class="form-control input-lg" type="password" name="password" ng-model="signup.password" placeholder="Password" required> <span class="ion-key form-control-feedback"></span> <div class="help-block text-danger" ng-if="signupForm.password.$dirty" ng-messages="signupForm.password.$error"> <div ng-message="required">Password is required.</div> </div> </div> <div class="form-group has-feedback" ng-class="{ \'has-error\' : signupForm.confirmPassword.$invalid && signupForm.confirmPassword.$dirty }"> <input password-match="signup.password" class="form-control input-lg" type="password" name="confirmPassword" ng-model="signup.confirmPassword" placeholder="Confirm Password"> <span class="ion-key form-control-feedback"></span> <div class="help-block text-danger" ng-if="signupForm.confirmPassword.$dirty" ng-messages="signupForm.confirmPassword.$error"> <div ng-message="compareTo">Password must match.</div> </div> </div> <p class="text-center text-muted"><small>By clicking on Sign up, you agree to <a href="#">terms & conditions</a> and <a href="#">privacy policy</a></small></p> <button type="submit" ng-disabled="signupForm.$invalid" class="btn btn-lg btn-block btn-primary">Sign up</button> <br> <p class="text-center text-muted">Already have an account? <a href="#/login">Log in now</a></p> </form> </div> </div> </div> </div>')}]);