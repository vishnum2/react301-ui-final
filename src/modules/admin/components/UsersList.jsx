import React,{useState, useEffect} from 'react';
import axiosWrapper from '../../../apis/axiosCreate';
import { Column, Table, SortDirection, AutoSizer } from "react-virtualized";
import "react-virtualized/styles.css";

const UsersList = () => {

    const [allusers, setAllUsers] = useState(null);
    const [width, setWidth] = useState(window.innerWidth);
    const [height, setHeight] = useState(window.innerHeight* 80 / 100);

    const getusers = async () => {
        console.log('get users running');
        const response = await axiosWrapper.get(`users`);
        setAllUsers(response.data);
    }

    const windowResizeSetter = () => {
        const width = window.innerWidth;
        const height = window.innerHeight*80 / 100;
        setHeight(height);
        setWidth(width);
        // return {width, height};
    }

    useEffect(() => {
        getusers();
        window.addEventListener('resize',windowResizeSetter)
    },[])

    if(window.sessionStorage.getItem('usertype') === 'admin') {
        if(allusers) {
            {console.log(allusers)}
            // const width = window.innerWidth;
            // const height = window.innerHeight*80 / 100;
            // const { width,height } = windowResizeSetter();
            console.log(width, height);
            return (
                <div>
                {/* {console.log(allusers)} */}
                {/* <h1>USERS LIST</h1> */}
            {/* <AutoSizer>
                {() => ( */}
                <Table
                  width={width}
                  height={height}
                  headerHeight={30}
                  rowHeight={30}
                //   sort={this._sort}
                //   sortBy={this.state.sortBy}
                //   sortDirection={this.state.sortDirection}
                  rowCount={allusers.length}
                  rowGetter={({ index }) => allusers[index]}
                >
                  <Column label="Name" dataKey="first_name" width={width/3} />
                  <Column width={width/3} label="Email" dataKey="email" />
                  <Column width={width/3} label="Balance Points" dataKey="balance_points" />
                </Table>
               {/* )}
            </AutoSizer>  */}
                </div>
            )
        } else {
            return (
                <h1> Loading ... </h1>
            )
        }
    } else {
        return (
            <h1>You are not an Admin</h1> 
        )
    }
}

export default UsersList;