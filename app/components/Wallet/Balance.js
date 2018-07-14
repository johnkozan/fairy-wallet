// @flow
import _ from 'lodash';
import React, { Component } from 'react';
import { render } from 'react-dom';
import { Container, Grid, Icon, Label, List, Table, Segment, Modal, Button, Input } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addToken } from '../../actions/settings'

type Props = {
    accounts: {},
    actions: {}
};

class Balance extends Component<Props> {
    constructor(props) {
        super(props);
    }
    
    state = {
        token: ''
    }
    
    handleChange = (e, { name, value }) => {
        this.setState({ [name]: value })
    };

    addToken = () => {
        const {
            accounts
        } = this.props;
        
        const {
            token
        } = this.state;
        
        this.props.actions.addToken(accounts.account.account_name, token);
    }

    componentWillMount(){
        const {
            accounts
        } = this.props
        
        
        this.addToken(accounts.account.account_name, 'EOS');
//        this.addToken(accounts.account.account_name, 'Mocha');
    }
    
    render() {
        const {
            accounts,
            settings
        } = this.props;

        const { token } = this.state
        
        return (
            <Segment.Group className='no-border no-padding'>
                <Segment>
                    <Label>
                        Account:
                        <Label.Detail>
                            {accounts.account.account_name}
                        </Label.Detail>
                    </Label>
                </Segment>
                <Segment>
                    <Label>
                        Balance:
                        <Label.Detail>
                            {accounts.account.core_liquid_balance}
                        </Label.Detail>
                    </Label>
                </Segment>
                <Segment>
                    <Table celled basic='very' compact='very' unstackable>
                        <Table.Header>
                          <Table.Row>
                            <Table.HeaderCell>
                              Currency
                            </Table.HeaderCell>
                            <Table.HeaderCell>
                              Balance
                            </Table.HeaderCell>
                          </Table.Row>
                        </Table.Header>
                        <Table.Body>
                          {_.map(accounts.balances, (balance, currency) => (
                            <Table.Row key={currency}>
                              <Table.Cell collapsing>{currency}</Table.Cell>
                              <Table.Cell collapsing>{balance}</Table.Cell>
                            </Table.Row>
                          ))}
                        </Table.Body>
                    </Table>
                </Segment>
                <Segment>
                    <Modal size='tiny' trigger={<Button>Add new token</Button>}>
                        <Modal.Content>
                            <Modal.Description>
                                <Input name='token' value={token} placeholder='Token name...' onChange={this.handleChange} />
                            </Modal.Description>
                        </Modal.Content>
                        <Modal.Actions>
                            <Button basic onClick={this.addToken}>Add</Button>
                        </Modal.Actions>
                    </Modal>
                </Segment>
            </Segment.Group>
        );
    }
}

const mapStateToProps = state => {
    return {
        settings: state.settings
    }
}

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators({
            addToken: addToken
        }, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Balance);