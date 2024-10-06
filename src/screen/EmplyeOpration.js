import { View, Text, Button, FlatList, TouchableOpacity, Dimensions, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import Modal from "react-native-modal";
const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;


const EMPlist = [
    {
        "name": "John Doe",
        "employeeId": 1,
        "age": 32,
        "company": "ABC Corporation"
    },
    {
        "name": "Jane Smith",
        "employeeId": 2,
        "age": 41,
        "company": "XYZ Inc."
    },
    {
        "name": "Alice Johnson",
        "employeeId": 3,
        "age": 29,
        "company": " DEF Ltd."
    },
    {
        "name": "Bob Brown",
        "employeeId": 4,
        "age": 38,
        "company": "GHI Enterprises"
    },
    {
        "name": "Eve Davis",
        "employeeId": 5,
        "age": 45,
        "company": "JKL Industries"
    },
    {
        "name": "Mike Miller",
        "employeeId": 6,
        "age": 36,
        "company": "ABC Corporation"
    },
    {
        "name": "Sophia Taylor",
        "employeeId": 7,
        "age": 27,
        "company": "XYZ Inc."
    },
    {
        "name": "Oliver White",
        "employeeId": 8,
        "age": 48,
        "company": " DEF Ltd."
    },
    {
        "name": "Isabella Martin",
        "employeeId": 9,
        "age": 31,
        "company": "GHI Enterprises"
    },
    {
        "name": "Charlotte Harris",
        "employeeId": 10,
        "age": 42,
        "company": "JKL Industries"
    }
]
const Main_list = () => {
    const [list, setList] = useState([]);
    const [isModalVisible, setModalVisible] = useState(false);
    const [employeeName, setEmployeeName] = useState(null);

    const [age, setAge] = useState(null);
    const [company, setcompany] = useState(null);


    const renderItem = ({ item }) => {
        return (
            <View style={{ flex: 1, backgroundColor: 'grey', flexDirection: 'row', margin: 10, padding: 10, borderRadius: 10 }}>
                <Text>{item.employeeId}</Text>
                <Text>{item.name}</Text>
                <Text>{item.age}</Text>
                <Text>{item.company}</Text>

                <View style={{ flex: 1, padding: 5, flexDirection: 'row', justifyContent: 'space-around' }}>
                    <Button title="Edit" onPress={() => handleEdit(item)} />
                    <Button title="Delete" onPress={() => DeleteEmp(item.employeeId)} />
                </View>
            </View>
        )
    }


    const handleEdit = (item) => {
        setModalVisible(true);
        const emplyee = list.find((i) => i.employeeId === item.employeeId);
        console.log("single", emplyee.age)
        setEmployeeName(emplyee.name);
        setAge(emplyee["age"].toString());
        setcompany(emplyee.company);
        list.map((i)=>{
            if(i.employeeId === item.employeeId){
                i.age = age;
                i.company = company;
                i.name= employeeName;
            }
        })

    }


    const DeleteEmp = (i) => {

        const newlist = list.filter((item) => item.employeeId !== i);
        setList(newlist);

    }

    useEffect(() => {
        setList(EMPlist);
        console.log("first")
    }, []);

    useEffect(() => {
        console.log(list);
        console.log("second")
    }, [list]);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const handleAdd = () => {
        setModalVisible(false);
        const newItem = {
            employeeId: Math.floor(Math.random() * 100),
            name: employeeName,
            age: age,
            company: company
        }
        console.log("new", newItem)
        setList([...list, newItem])
        setAge(null)
        setEmployeeName(null)
        setcompany(null)

    }


    return (
        <View style={{ flex: 1, }}>

            <View style={{ flexDirection: 'column', flex: 0.2, justifyContent: 'center' }}>

                <Button
                    title='add Employee'
                    onPress={toggleModal}
                />
            </View>
            <View style={{ flexDirection: 'row', flex: 1, }}>

                <FlatList
                    data={list}
                    keyExtractor={(i) => i.employeeId.toString()}
                    renderItem={renderItem}
                />
            </View>
            <Modal
                deviceWidth={deviceWidth}
                deviceHeight={deviceHeight}
                style={{ margin: 5 }}
                animationIn='slideInUp'
                isVisible={isModalVisible}>
                <View style={{ flex: 0.5, backgroundColor: '#ffffff', padding: 5 }}>
                    <Text>Please enter new Employee details</Text>
                    <TextInput
                        style={{ height: 40, borderColor: 'gray', borderWidth: 1, margin: 5 }}
                        onChangeText={(text) => setEmployeeName(text)}
                        value={employeeName}
                        placeholder="Employee Name"
                    />

                    <TextInput
                        style={{ height: 40, borderColor: 'gray', borderWidth: 1, margin: 5 }}
                        onChangeText={(text) => setAge(text)}
                        value={age}
                        placeholder="age"
                    />

                    <TextInput
                        style={{ height: 40, borderColor: 'gray', borderWidth: 1, margin: 5 }}
                        onChangeText={(text) => setcompany(text)}
                        value={company}
                        placeholder="company"
                    />


                </View>
                <View style={{ backgroundColor: '#ffffff', padding: 5, flexDirection: 'row', justifyContent: 'space-around' }}>
                    <Button title="Submit" onPress={handleAdd} />
                    <Button title="Hide modal" onPress={toggleModal} />
                </View>

            </Modal>

        </View>
    )
}

export default Main_list