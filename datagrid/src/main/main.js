import React, { Component } from 'react';
import DataGrid, {
    Column,
    SearchPanel,
    Scrolling,
    Pager,
    Paging,
    Editing,
    Popup,
    Form,
    Toolbar,
    DataGridHeaderFilter,
    Button
} from "devextreme-react/data-grid";
import { Item } from 'devextreme-react/form';
import LocalStore from 'devextreme/data/local_store';

import 'devextreme/dist/css/dx.light.css';
import './../App.css';
import service from "./../data.js";


const allowedPageSizes = [4, 8, 20, 'all']; //açılır menü için değerler
const store = new LocalStore({
    key: 'ID',
    data: service.getOrders(),
    name: 'myLocalData',
});
const cachedData = JSON.parse(localStorage.getItem('myLocalData'));
class Main extends Component {
    constructor(props) {
        super(props);
        this.orders = cachedData ? JSON.parse(localStorage.getItem('myLocalData')) :service.getOrders();
        this.state = {
            showFilterRow: true,
            displayMode: 'compact',
            showPageSizeSelector: true,
            showInfo: true,
            showNavButtons: true,
            showFilterRow: true,
            showHeaderFilter: true,
            clicked: false,
            textFromStorage:0
        };

    }

    addText = { text: 'Yeni Hesap Ekle' }; //Hesap ekleme butonu için text
    buttonPress = () => {
        this.setState({
            clicked: !this.state.clicked,
        });

    };
    componentDidUpdate(prevProps, prevState) {
        if(prevState.clicked !== this.state.clicked){
            store.insert(this.orders)
            localStorage.setItem('myLocalData',JSON.stringify(this.orders) );
            this.state.textFromStorage = JSON.parse(localStorage.getItem('myLocalData'));
            
        }

    }
    render() {
        return (
            <div className="main-menu" style={{ backgroundColor: "#EFF2FF" }}>
                <DataGrid
                    id="gridContainer"
                    dataSource={this.orders}
                    keyExpr="ID"
                    showBorders={true}
                    style={{ borderRadius: "6px" }}
                    
                >

                    <SearchPanel visible={true} width={240} placeholder="Search objects..." />
                    <DataGridHeaderFilter visible={this.state.showHeaderFilter} />
                    {/* Figmada filtreleme tasarımı yoktu. Bende çalışır hale gelmesi için bunu kullandım ^ */}
                    <Editing
                        mode="popup"
                        allowAdding={true}
                        visible={true}
                        applyFilter={onclick}
                        // allowUpdating={true}
                    >
                        {/* Açılır menü */}
                        <Popup width={490} height={406} />
                        <Button
                className="bs-icon-custom-edit"
        >
            </Button>
                        {/* Form */}
                        <Form>
                            <Item itemType="group" >
                                <Item dataField="SosyalMedyaLinki" />
                                <Item dataField="SosyalMedyaAdi" />
                                <Item dataField="Aciklama" />
                            </Item>
                        </Form>
                    </Editing>
                    <Column
                        dataField="SosyalMedyaLinki"
                        caption="Sosyal Medya Linki"
                    ></Column>
                    <Column dataField="SosyalMedyaAdi" caption="Sosyal Medya Adı" />
                    <Column dataField="Aciklama" caption="Açıklama"></Column>
                    <Toolbar>
                        <Item name="addRowButton" showText="always" options={this.addText} onClick={this.buttonPress} />
                        <Item name="applyFilterButton" showText="always" />
                        <Item name="searchPanel" showText="always" />
                    </Toolbar>
                    <Scrolling rowRenderingMode='virtual'></Scrolling>
                    <Paging defaultPageSize={10} />
                    <Pager
                        visible={true}
                        allowedPageSizes={allowedPageSizes}
                        displayMode={this.state.displayMode}
                        showPageSizeSelector={this.state.showPageSizeSelector}
                        infoText="Show:" //açılır menü için kullandım
                        showInfo={this.state.showInfo} //bilgi için ekledim
                        showNavigationButtons={this.state.showNavButtons} />
                </DataGrid>
            </div>
        );
    }
}

export default Main;