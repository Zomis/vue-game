import Vue from "vue";
import Router from "vue-router";
import StartScreen from "@/components/StartScreen";
import HelloWorld from "@/components/HelloWorld";
import FlexGame from "@/components/FlexGame";
import LobbyScreen from "@/components/LobbyScreen";
import CreateFlexGame from "@/components/CreateFlexGame";
import PreFlexGame from "@/components/PreFlexGame";

Vue.use(Router);

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
        q: route.query.q,
        createScreen: CreateFlexGame,
        preGame: PreFlexGame,
        game: FlexGame
      })
    }
  ]
});
