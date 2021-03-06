import React, { Component } from 'react'
import { StyleSheet, Image, Text, View, TouchableOpacity, Alert, AsyncStorage as storage } from 'react-native'
import Sound from 'react-native-sound'

import { connect } from 'react-redux'
import { addScore, updateScore } from '../../publics/redux/actions/leaderboard'

class Main extends Component {
    constructor(props) {
        super(props)

        this.state = {
            leaderboards: [],
            hasil: 0,
            button: 3,
            isNow: 0,
            pattern: [3, 3, 3, 1, 2, 3, 4],
            combo: 0,
            score: 0,
            timer: null,
            id: '',
            token: '',
            data: this.props.navigation.getParam('data')
        }

        storage.getItem('iduser', (error, result) => {
            if (result) {
                this.setState({
                    id: result
                })
            }
        })

        storage.getItem('token', (error, result) => {
            if (result) {
                this.setState({
                    token: result
                })
            }
        })

    }

    add = () => {
        if (this.state.data === undefined) {
            console.log('TOKEN: ', this.state.token)
            if (this.state.token === null || this.state.token === '') {
                Alert.alert(
                    'Kamu belum login!',
                    `tidak dapat menyimpan skor :( ${this.state.score}`,
                    [
                        { text: 'Login Sekarang', onPress: () => this.props.navigation.navigate('Auth') },
                        { text: 'Cancel', onPress: () => this.props.navigation.goBack() }
                    ]
                )
                this.setState({
                    score: 0,
                    hasil: 0,
                    isNow: 0,
                    combo: 0
                })
            } else {
                console.log("id USER: ", this.state.id)
                console.log("TOKEN: ", this.state.token)
                const data = {
                    iduser: Number(this.state.id),
                    skor: this.state.score
                }
                this.props.dispatch(addScore(data))
                    .then(() => {
                        this.setState({
                            score: 0,
                            hasil: 0,
                            isNow: 0,
                            combo: 0
                        })
                        this.props.navigation.navigate('App')
                    })
            }
        } else {
            console.log(this.state.data.skor)
            console.log(this.state.score)
            if (this.state.score > this.state.data.skor) {
                console.log(this.state.data.skor)

                const data = {
                    iduser: Number(this.state.id),
                    skor: this.state.score
                }

                this.props.dispatch(updateScore(Number(this.state.id), data))
                    .then(() => {
                        this.setState({
                            score: 0,
                            hasil: 0,
                            isNow: 0,
                            combo: 0
                        })

                        this.props.navigation.navigate('App')
                    })
            } else {
                this.setState({
                    score: 0,
                    hasil: 0,
                    isNow: 0,
                    combo: 0
                })

                this.props.navigation.navigate('App')
            }
        }
        this.props.navigation.navigate('App')
    }

    kick1 = async () => {
        const s = new Sound('kick2.wav', Sound.MAIN_BUNDLE, (e) => {
            if (e) {
                console.log('Error in SOUND', e);
                return;
            }
            s.play(() => {
                s.release()
                s.setVolume(1.0)
            });
        });

        await this.setState({
            button: 1
        })

        if (this.state.pattern[this.state.isNow] === this.state.button) {
            if (this.state.pattern.length === this.state.isNow + 1) {
                await this.setState({
                    combo: this.state.combo + 1,
                    isNow: 0
                })
            }

            await this.setState({
                score: this.state.score + 2,
                isNow: this.state.isNow + 1
            })
        } else {
            Alert.alert(
                'Yahh kalah ;(',
                `Skormu: ${this.state.score}`,
                [
                    { text: 'Coba lagi' },
                    { text: 'Keluar', onPress: () => this.add() }
                ]
            )
        }

        await this.setState({
            button: this.state.pattern[this.state.isNow]
        })

        if (this.state.timer) {
            clearTimeout(this.state.timer); //cancel the previous timer.
            this.setState({
                timer: null
            })
        }

        this.setState({
            timer: setTimeout(() => {
                Alert.alert(
                    "Yahh waktu habis ;(",
                    `Skormu: ${this.state.score}`,
                    [
                        { text: 'Coba lagi' },
                        { text: 'Keluar', onPress: () => this.add() }
                    ]
                );
            }, 4000)
        })
    }

    snare1 = async () => {
        await this.setState({
            button: 2
        })
        const s = new Sound('snare8.wav', Sound.MAIN_BUNDLE, (e) => {
            if (e) {
                console.log('Error in SOUND', e);
                return;
            }
            s.play(() => {
                s.release()
                s.setVolume(1.0)
            });
        });

        if (this.state.pattern[this.state.isNow] === this.state.button) {
            if (this.state.pattern.length === this.state.isNow + 1) {
                await this.setState({
                    combo: this.state.combo + 1,
                    isNow: 0
                })
            }

            await this.setState({
                score: this.state.score + 2,
                isNow: this.state.isNow + 1
            })
        } else {
            Alert.alert(
                'Yahh kalah ;(',
                `Skormu: ${this.state.score}`,
                [
                    { text: 'Coba lagi' },
                    { text: 'Keluar', onPress: () => this.add() }
                ]
            )
        }

        await this.setState({
            button: this.state.pattern[this.state.isNow]
        })
        if (this.state.timer) {
            clearTimeout(this.state.timer); //cancel the previous timer.
            this.setState({
                timer: null
            })
        }

        this.setState({
            timer: setTimeout(() => {
                Alert.alert(
                    "Yahh waktu habis ;(",
                    `Skormu: ${this.state.score}`,
                    [
                        { text: 'Coba lagi' },
                        { text: 'Keluar', onPress: () => this.add() }
                    ]
                );
            }, 4000)
        })
    }

    snare2 = async () => {
        const s = new Sound('snare2.wav', Sound.MAIN_BUNDLE, (e) => {
            if (e) {
                console.log('Error in SOUND', e);
                return;
            }
            s.play(() => {
                s.release()
                s.setVolume(1.0)
            });
        });
        await this.setState({
            button: 3
        })

        if (this.state.pattern[this.state.isNow] === this.state.button) {
            if (this.state.pattern.length === this.state.isNow + 1) {
                await this.setState({
                    combo: this.state.combo + 1,
                    isNow: 0
                })
            }

            await this.setState({
                score: this.state.score + 2,
                isNow: this.state.isNow + 1
            })
        } else {
            Alert.alert(
                'Yahh kalah ;(',
                `Skormu: ${this.state.score}`,
                [
                    { text: 'Coba lagi' },
                    { text: 'Keluar', onPress: () => this.add() }
                ]
            )
        }
        await this.setState({
            button: this.state.pattern[this.state.isNow]
        })

        if (this.state.timer) {
            clearTimeout(this.state.timer); //cancel the previous timer.
            this.setState({
                timer: null
            })
        }

        this.setState({
            timer: setTimeout(() => {
                Alert.alert(
                    "Yahh waktu habis ;(",
                    `Skormu: ${this.state.score}`,
                    [
                        { text: 'Coba lagi' },
                        { text: 'Keluar', onPress: () => this.add() }
                    ]
                );
            }, 4000)
        })
    }

    kick2 = async () => {
        const s = new Sound('kick2.wav', Sound.MAIN_BUNDLE, (e) => {
            if (e) {
                console.log('Error in SOUND', e);
                return;
            }
            s.play(() => {
                s.release()
                s.setVolume(1.0)
            });
        });

        await this.setState({
            button: 4
        })

        if (this.state.pattern[this.state.isNow] === this.state.button) {
            if (this.state.pattern.length === this.state.isNow + 1) {
                await this.setState({
                    combo: this.state.combo + 1,
                    isNow: 0
                })
            }

            await this.setState({
                score: this.state.score + 2,
                isNow: this.state.isNow + 1
            })
        } else {
            Alert.alert(
                'Yahh kalah ;(',
                `Skormu: ${this.state.score}`,
                [
                    { text: 'Coba lagi' },
                    { text: 'Keluar', onPress: () => this.add() }
                ]
            )
        }
        await this.setState({
            button: this.state.pattern[this.state.isNow]
        })

        if (this.state.timer) {
            clearTimeout(this.state.timer); //cancel the previous timer.
            this.setState({
                timer: null
            })
        }

        this.setState({
            timer: setTimeout(() => {
                Alert.alert(
                    "Yahh waktu habis ;(",
                    `Skormu: ${this.state.score}`,
                    [
                        { text: 'Coba lagi' },
                        { text: 'Keluar', onPress: () => this.add() }
                    ]
                );
            }, 4000)
        })
    }
    render() {
        return (
            <View style={styles.container}>
                <Image source={require('../../assets/undraw_walk_in_the_city_1ma6.png')} style={styles.backgroundTopRight} />
                <Text style={styles.txtScore}>
                    Score
                </Text>
                <Text style={styles.txtNumber}>{this.state.score}</Text>
                <Text>Hit Combos: {this.state.combo}</Text>
                <View style={styles.container}>
                    <View style={{ top: '5%' }}>
                        <View
                            style={{ flexDirection: 'row', justifyContent: 'space-around', marginHorizontal: 50 }}>
                            {
                                this.state.button == 2
                                    ?
                                    <SmallDrum sound={this.snare1.bind(this)} backgroundColor={'blue'} />
                                    :
                                    <SmallDrum sound={this.snare1.bind(this)} />
                            }
                            {
                                this.state.button == 3
                                    ?
                                    <SmallDrum sound={this.snare2.bind(this)} backgroundColor={'blue'} />
                                    :
                                    <SmallDrum sound={this.snare2.bind(this)} />
                            }
                        </View>
                        <View
                            style={{ flexDirection: 'row', justifyContent: 'space-evenly', bottom: '15%' }}>
                            {
                                this.state.button == 1
                                    ?
                                    <BigDrum sound={this.kick1.bind(this)} backgroundColor={'blue'} />
                                    :
                                    <BigDrum sound={this.kick1.bind(this)} />
                            }
                            {
                                this.state.button == 4
                                    ?
                                    <BigDrum sound={this.kick2.bind(this)} backgroundColor={'blue'} />
                                    :
                                    <BigDrum sound={this.kick2.bind(this)} />
                            }
                        </View>
                    </View>
                </View>

                <Image source={require('../../assets/undraw_compose_music_ovo2.png')} style={styles.backgroundBottomLeft} />
            </View>
        )
    }
}

class BigDrum extends Component {
    render() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                style={styles.bigDrum}
                onPress={this.props.sound}
            >
                <View style={[styles.bigDrumOutter, { backgroundColor: this.props.backgroundColor || '#EECECE' }]}>
                    <View style={styles.bigDrumInner} />
                </View>
            </TouchableOpacity>
        )
    }
}

class SmallDrum extends Component {
    render() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                style={styles.smallDrum}
                onPress={this.props.sound}
            >
                <View style={[styles.smallDrumOutter, { backgroundColor: this.props.backgroundColor || '#F7F7F7' }]}>
                    <View style={styles.smallDrumInner} />
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    bigDrum: {
        width: '75%',
        height: 100,
        top: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    bigDrumOutter: {
        width: 100,
        height: 100,
        borderRadius: 100 / 2,
        backgroundColor: '#EECECE',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 8
    },
    bigDrumInner: {
        width: 50,
        height: 50,
        borderRadius: 100 / 2,
        backgroundColor: '#E3A6AE',
        position: 'absolute'
    },
    smallDrum: {
        width: '25%',
        height: 70,
        alignItems: 'center',
        justifyContent: 'center'
    },
    smallDrumOutter: {
        width: 80,
        height: 80,
        borderRadius: 100 / 2,
        backgroundColor: '#F7F7F7',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 8
    },
    smallDrumInner: {
        width: 40,
        height: 40,
        borderRadius: 100 / 2,
        backgroundColor: '#B7C8CB',
        position: 'absolute'
    },
    backgroundTopRight: {
        opacity: 0.5,
        position: 'absolute',
        width: 200,
        height: 150,
        alignSelf: 'flex-end'
    },
    backgroundBottomLeft: {
        opacity: 0.5,
        width: 200,
        height: 150,
        marginRight: 'auto'
    },
    txtScore: {
        fontFamily: 'Comic Sans MS',
        fontSize: 50,
        color: '#3F51B5',
        fontWeight: 'bold',
    },
    txtNumber: {
        fontFamily: 'Comic Sans MS',
        fontSize: 40,
        color: '#3F51B5',
        fontWeight: 'bold',
    },
    container: {
        flex: 1,
        margin: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

const mapStateToProps = state => {
    return {
        leaderboards: state.leaderboard.leaderboardList
    };
};
export default connect(mapStateToProps)(Main)
