import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Pin from '../../assets/videollamada.webp'

const Home = props =>
  <div className="content-fluid">
    <div className="row">
      <div className="col-6" hidden>
        <h1 className="title">ThonyVideo</h1>
        <p>Por favor crea un nombre de sala</p>
        <input type="text" name="room" value={props.roomId} onChange={props.handleChange} pattern="^\w+$" maxLength="10" required autoFocus title="El nombre de la sala solo debe contener letras o números" />
        <Link className="primary-button" to={'/r/' + props.roomId}>Unirse</Link>
        <Link className="primary-button" to={'/r/' + props.defaultRoomId}>Aleatorio</Link>
        {props.rooms.length !== 0 && <div>Salas usadas recientemente:</div>}
        {props.rooms.map(room => <Link key={room} className="recent-room" to={'/r/' + room}>{room}</Link>)}
      </div>
      <div className="col-12">
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-12 col-sm-7 col-md-6 col-xl-5">
              <div className="">
                <div className="container h-100">
                  <div className="d-flex justify-content-center h-100">
                    <div className="user_card">
                      <div className="container-fluid">
                        <div className="row justify-content-center">
                          <div className="col-6">
                            <img src={Pin} className="img-fluid"></img>
                          </div>
                        </div>
                      </div>
                      <div className="d-flex justify-content-center form_container mt-0">
                        <h4 className="text-center title mt-0 pt-0">ThonyVideo</h4>
                      </div>
                      <div className="d-flex justify-content-center">
                        <br></br>
                        <div className="container-fluid">
                          <div className="row">
                            <div className="col-12">
                              <input className="form-control" type="text" name="room" value={props.roomId} onChange={props.handleChange} pattern="^\w+$" maxLength="10" required autoFocus placeholder="Conectate a una sala o crea una" />
                            </div>
                            <div className="col-12">
                              <Link className="btn btn-primary btn-block" to={'/r/' + props.roomId}>Crear o Unirse</Link>
                            </div>
                            <div className="col-6" hidden>
                              <Link className="btn btn-primary btn-block" to={'/r/' + props.defaultRoomId}>Aleatorio</Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>;

Home.propTypes = {
  handleChange: PropTypes.func.isRequired,
  defaultRoomId: PropTypes.string.isRequired,
  roomId: PropTypes.string.isRequired,
  rooms: PropTypes.array.isRequired
};

const mapStateToProps = store => ({ rooms: store.rooms });

export default connect(mapStateToProps)(Home);