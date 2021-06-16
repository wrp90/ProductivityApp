import React from 'react';

function Dashboard() {
    return (
        <div className="row " style={{ backgroundColor: 'lightblue', height: '100vh' }}>
            <div className="col-sm-12  ">
                <div className="row justify-content-center">
                    <div className="col-sm-4">
                        <h1 className="w-100" style={{ fontSize: 75 }}>Welcome to your dashboard!</h1>
                        <br></br>
                        <img className="w-100" src="https://i0.wp.com/bestlifeonline.com/wp-content/uploads/2019/12/shutterstock_1290320698.jpg" alt="puppy"></img>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;