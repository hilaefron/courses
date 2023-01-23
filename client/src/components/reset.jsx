import React from 'react';

const Reset = () => {
    return (
        <div>
            <div class="form-group">
                <label for="exampleInputPassword1"> old Password</label>
                <input 
                type="password" 
                class="form-control" 
                id="exampleInputPassword1" 
                placeholder="Password"/>
            </div>
            <div class="form-group">
                <label for="exampleInputPassword1"> new Password</label>
                <input 
                type="password" 
                class="form-control" 
                id="exampleInputPassword1" 
                placeholder="Password"/>
            </div>
            <div class="form-group">
                <label for="exampleInputPassword1"> new Password</label>
                <input 
                type="password" 
                class="form-control" 
                id="exampleInputPassword1" 
                placeholder="Password"/>
            </div>
            <button type="submit" class="btn btn-primary">reset</button>

            

        </div>
    );
}

export default Reset;
