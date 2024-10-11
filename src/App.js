import './App.css';

function App() {
  return (
    <div className="App flex">
      <div id='timer-display' className='flex'>
        <p className='timer-label'>Session</p>
        <h1 id='time-left'><span className='min'>25</span>:<span className='sec'>00</span></h1>
      </div>
      <div id='timer-length' className='flex'>
        <div className='left length'>
          <p id='break-label' className='break label'>Break label</p>
          <div className='break-controls controls flex'>
          <span id='break-decrement' class="material-symbols-outlined">do_not_disturb_on</span>
          <h2 className='break-length'>5</h2>
          <span id='break-increment' class="material-symbols-outlined">add_circle</span>
          </div>
        </div>
        <div className='right length'>
          <p id='break-label' className='session label'>Session label</p>
          <div className='session-controls controls flex'>
          <span id='session-decrement' class="material-symbols-outlined">do_not_disturb_on</span>
          <h2 className='session-length'>25</h2>
          <span id='session-increment' class="material-symbols-outlined">add_circle</span>
          </div>
        </div>
      </div>
      <div id='timer-controls' className='flex'>
          <span id='start_stop' class="material-symbols-outlined dark">not_started</span>
          <span id='reset' class="material-symbols-outlined dark">sync</span>      
      </div>
    </div>
  );
}

export default App;
