import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
    IconButton,
    IconButtonColor,
} from "../../common/IconButton/IconButton";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import {
    IGameOptions,
    playerJoinedRoom,
    selectAvilaIsServerConnnected,
    selectAvilaRoomCreated,
    setRoomCreated,
    startGame,
} from "../../../features/avilaSlice";
import styles from "./AvilaSettings.module.scss";
import { CommWrapper } from "../../../assets/avila/CommWrapper";

const CREATE_VALUE = "create";
const JOIN_VALUE = "join";

export const AvilaSettings: React.FC<{}> = () => {
    const dispatch = useAppDispatch();
    const roomCreated = useAppSelector(selectAvilaRoomCreated);
    const isServerConnected = useAppSelector(selectAvilaIsServerConnnected);
    const [name, setName] = useState("");
    const [room, setRoom] = useState("");
    const [joinedRoom, setJoinedRoom] = useState("");
    const [connectType, setConnectType] = useState(CREATE_VALUE);

    // setup callback to handle this user creating a room
    useEffect(() => {
        CommWrapper.roomCreationCallback = (room: string) => {
            setRoom(room);
            dispatch(setRoomCreated({ name: name }));
        };
    }, [setRoom, dispatch, name]);

    // setup callback to handle new players being added to the room
    // this should only be done if the player created the room
    useEffect(() => {
        if (roomCreated) {
            CommWrapper.joinedRoomHostCallback = (newPlayerName: string) => {
                dispatch(playerJoinedRoom({ name: newPlayerName }));
            };
        }

        // we don't want to add more players after this component is gone (because
        // that means the game has started)
        return () => (CommWrapper.joinedRoomHostCallback = undefined);
    }, [roomCreated, dispatch]);

    const joinedOrCreatedRoom = roomCreated || joinedRoom !== "";
    const showCreateRoom = !joinedOrCreatedRoom && connectType === CREATE_VALUE;
    const showJoinRoom = !joinedOrCreatedRoom && connectType === JOIN_VALUE;

    return (
        <div className={styles.settingsWrapper}>
            <div>
                <div>
                    <input
                        type="radio"
                        name="connect_type"
                        value={CREATE_VALUE}
                        checked={connectType === CREATE_VALUE}
                        onChange={(e) => setConnectType(e.target.value)}
                        disabled={joinedOrCreatedRoom}
                    />
                    <label>Create Room</label>
                    <input
                        type="radio"
                        name="connect_type"
                        value={JOIN_VALUE}
                        checked={connectType === JOIN_VALUE}
                        onChange={(e) => setConnectType(e.target.value)}
                        disabled={joinedOrCreatedRoom}
                    />
                    <label>Join Room</label>
                </div>
                {showCreateRoom && (
                    <CreateRoom
                        setName={setName}
                        enableCreateRoom={
                            isServerConnected &&
                            !joinedOrCreatedRoom &&
                            name !== ""
                        }
                        onCreateRoom={() => CommWrapper.CreateRoom(name)}
                    />
                )}
                {showJoinRoom && (
                    <JoinRoom
                        setName={setName}
                        setRoom={setRoom}
                        onJoinRoom={() => {
                            CommWrapper.JoinRoom(room, name);
                            setJoinedRoom(room);
                        }}
                        enableJoinRoom={
                            isServerConnected &&
                            !joinedOrCreatedRoom &&
                            name !== "" &&
                            room !== ""
                        }
                    />
                )}
                {roomCreated && (
                    <RoomSettings
                        onStartGame={(options: IGameOptions) =>
                            dispatch(startGame(options))
                        }
                        roomId={room}
                    />
                )}
                {joinedRoom !== "" && (
                    <div>{`Waiting for host to start game ${room}`}</div>
                )}
                {!isServerConnected && <div>Connecting to server...</div>}
            </div>
        </div>
    );
};

interface ICreateRoom {
    setName: (newName: string) => void;
    enableCreateRoom: boolean;
    onCreateRoom: () => void;
}

const CreateRoom: React.FC<ICreateRoom> = (props) => {
    const { setName, onCreateRoom, enableCreateRoom } = props;

    return (
        <>
            <div>
                <label>Name</label>
                <input
                    onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setName(e.target.value)
                    }
                />
            </div>
            <div>
                <IconButton
                    displayText="Create Room"
                    color={IconButtonColor.Green}
                    icon={solid("plus")}
                    disabled={!enableCreateRoom}
                    clickCallback={onCreateRoom}
                />
            </div>
        </>
    );
};

interface IJoinRoom {
    setName: (newName: string) => void;
    setRoom: (newRoom: string) => void;
    enableJoinRoom: boolean;
    onJoinRoom: () => void;
}

const JoinRoom: React.FC<IJoinRoom> = (props) => {
    const { setName, setRoom, enableJoinRoom, onJoinRoom } = props;

    return (
        <>
            <div>
                <label>Name</label>
                <input
                    onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setName(e.target.value)
                    }
                />
            </div>
            <div>
                <label>Room</label>
                <input
                    onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setRoom(e.target.value)
                    }
                />
            </div>
            <div>
                <IconButton
                    displayText="Join Room"
                    color={IconButtonColor.Green}
                    icon={solid("plus")}
                    disabled={!enableJoinRoom}
                    clickCallback={onJoinRoom}
                />
            </div>
        </>
    );
};

interface IRoomSettings {
    onStartGame: (options: IGameOptions) => void;
    roomId: string;
}

const RoomSettings: React.FC<IRoomSettings> = (props) => {
    const { onStartGame, roomId } = props;
    const [river, setRiver] = useState(false);
    console.log(`river: ${river}`);

    return (
        <div>
            <div>
                <label>{`Room ID: ${roomId}`}</label>
            </div>
            <div>
                <input
                    type="checkbox"
                    checked={river}
                    onChange={() => setRiver(!river)}
                />
                <label>River Expansion</label>
            </div>
            <IconButton
                displayText="Start Game"
                color={IconButtonColor.Green}
                icon={solid("play")}
                clickCallback={() => onStartGame({ river: river })}
                disabled={false}
            />
        </div>
    );
};
