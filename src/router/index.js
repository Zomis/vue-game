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
import VueResource from "vue-resource";

Vue.use(Router);
Vue.use(VueResource);
Vue.http.options.root = "http://stats.zomis.net:8078/games2";
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
