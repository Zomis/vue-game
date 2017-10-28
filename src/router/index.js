import Vue from "vue";
import Router from "vue-router";
import StartScreen from "@/components/StartScreen";
import HelloWorld from "@/components/HelloWorld";
import FlexGame from "@/components/FlexGame";
import LobbyScreen from "@/components/LobbyScreen";
import CreateFlexGame from "@/components/CreateFlexGame";
import PreFlexGame from "@/components/PreFlexGame";
import GridView from "@/components/views/GridView";
import TTTView from "@/components/ttt/TTTView";
import RoyalGameOfURView from "@/components/ttt/RoyalGameOfURView";
import VueResource from "vue-resource";

Vue.use(Router);
Vue.use(VueResource);

var url = new URL(window.location.href);

Vue.http.options.root = "http://stats.zomis.net:8078/games2";
if (url.searchParams.get("server")) {
  Vue.http.options.root =
    "http://" + url.searchParams.get("server") + "/games2";
}
console.log("Using REST URL " + Vue.http.options.root);

// Vue.http.headers.common["Authorization"] = "Basic XXXXXXXXX";

export default new Router({
  routes: [
    {
      path: "/",
      name: "Start",
      component: StartScreen
    },
    {
      path: "/chess",
      name: "Chess",
      component: HelloWorld
    },
    {
      path: "/ttt",
      name: "TicTacToe",
      component: LobbyScreen,
      props: route => ({
        name: route.query.name,
        game: "ttt"
      })
    },
    {
      path: "/ur",
      name: "RoyalGameOfUR",
      component: LobbyScreen,
      props: route => ({
        name: route.query.name,
        game: "ur"
      })
    },
    {
      path: "/ur/:id",
      name: "RoyalGameOfURGame",
      component: FlexGame,
      props: route => ({
        id: route.params.id,
        token: route.query.token,
        game: "ur",
        view: RoyalGameOfURView
      })
    },
    {
      path: "/ttt/:id",
      name: "TicTacToeGame",
      component: FlexGame,
      props: route => ({
        id: route.params.id,
        token: route.query.token,
        game: "ttt",
        view: TTTView
        /*        createScreen: CreateFlexGame,
        preGame: PreFlexGame,
        game: FlexGame*/
      })
    }
  ]
});
