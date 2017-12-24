import React, { Component } from 'react';
import { StyleSheet, Text, View, ListView, Image, ActivityIndicator } from 'react-native';
import { observable, useStrict, action } from 'mobx';
import { Provider, observer, inject } from 'mobx-react/native';
import {URL} from './../utils/url';

/** 照片展示组件 */
@observer
export default class PhotoShow extends Component{
    /** 构造函数 */
    constructor(props) {
        super(props);
        this.fatchData();
    }
    /** 数据队列 */
    @observable
    loaded = false;
    /** ListView数据队列 */
    @observable
    viewList = new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
    });
    /** 请求数据 */
    fatchData() {
        fetch(URL.REQUEST_DRIBBBLE)
            .then(response => response.json())
            .then(responseData => {
                this.addToListView(responseData);
            }).done();
    }
    /** 添加数据列表 */
    @action
    addToListView(list) {
        console.log(list);
        this.viewList = this.viewList.cloneWithRows(list.slice());
        this.loaded = true;
    }
    /** 读出列表方法 */
    renderMovieList(lists){
        return(
            <View style={styles.item}>
                <View style={styles.itemImage}>
                    <Image source={{uri: lists.images.normal}} style={styles.image} />
                </View>
                <View style={styles.itemContent}>
                    <Text style={styles.itemTextTitle}>{lists.title}</Text>
                    <Text style={styles.itemTextAuthor}>{lists.user.name}</Text>
                    <Text>
                        <Text style={styles.itemTextViewCount}>
                            <Text style={styles.itemTextView}>view: </Text>{lists.views_count}   
                        </Text>
                        <Text style={styles.itemTextLikeCount}>
                            <Text style={styles.itemTextLike}>like: </Text>{lists.likes_count}   
                        </Text>
                    </Text>
                </View>
            </View>
        );
    }
    render(){
        //alert(this.loaded);
        if (!this.loaded){
            return (
                <View style={styles.container}>
                    <View style={styles.loading}>
                        <Text>loading</Text>
                        <ActivityIndicator size='large' color='#6435c9' />
                    </View>
                </View>
            );
        };
        return (
            <View style={styles.container}>
                <ListView style={{marginTop:20}} dataSource={this.viewList} renderRow={this.renderMovieList}/>
            </View>
        );
    }
}

let styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ACD6FF'
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    item: {
        flexDirection: 'row',
        backgroundColor: '#97CBFF',
        margin: 15,
    },
    itemImage: {
        width: 102,
        height: 148,
        margin: 6,
    },
    image: {
        width: 99,
        height: 138,
        margin: 6,
        alignItems: 'center',
    },
    itemContent: {
        flex: 1,
        marginLeft: 13,
        marginTop: 6,
    },
    itemTextTitle: {
        fontSize: 18,
        fontFamily: 'Helvetica Neue',
        fontWeight: '300',
        color: '#6435c9',
        marginBottom: 6,
    },
    itemTextAuthor: {
        color: '#000079',
        fontStyle: 'italic',
    },
    itemTextView: {
        color: '#0000C6',
        fontSize: 10,
    },
    itemTextLike: {
        color: '#0000C6',
        fontSize: 10,
    },
    itemTextViewCount: {
        color: '#db2828',
        fontSize: 15,
        fontWeight: '600',
    },
    itemTextLikeCount: {
        color: '#db2828',
        fontSize: 15,
        fontWeight: '600',
    },

});