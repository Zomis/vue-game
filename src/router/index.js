import Vue from "vue";
import Router from "vue-router";
import StartScreen from "@/components/StartScreen";
import HelloWorld from "@/components/HelloWorld";
import FlexGame from "@/components/FlexGame";
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
      path: "/ttt/:id",
      name: "TicTacToe",
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
