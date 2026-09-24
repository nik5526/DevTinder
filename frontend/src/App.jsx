import Body from "./Components/Body";
import {RouterProvider , createBrowserRouter} from "react-router-dom";
import Profile from "./Components/Profile";
import SignIn from "./Components/SignIn";
import {Provider} from "react-redux";
import appStore from "./utils/appStore";
import Feed from "./Components/Feed";

const appRouter = createBrowserRouter([
    {
      path : "/",
      element : <Body/>,
      children : [
        {path : "" , element : <Feed/>},
        {path : "profile" , element : <Profile/>},
        {path : "signin" , element : <SignIn/>}
      ]
    }
  ])

function App() {

  return (
    <>
      <Provider store = {appStore}>
        <RouterProvider router = {appRouter}/>
      </Provider>
    </>
  );
}

export default App;
 