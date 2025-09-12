export default function Home() {
  console.log("Home component mounted");

  const MainScreen = () => {
    console.log("MainScreen component rendered");
    return (
      <>
        <h1>Main Screen</h1>
        <p>This is the content of the main screen.</p>
      </>
    );
  };


  return (
    <div>
      <MainScreen />
    </div>
  );
}