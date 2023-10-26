import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
    IconButton,
    IconButtonColor,
} from "../../common/IconButton/IconButton";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import {
    playerJoinedRoom,
    selectAvilaIsServerConnnected,
    selectAvilaRoomCreated,
    setRoomCreated,
    startGame,
} from "../../../features/avilaSlice";
import styles from "./AvilaSettings.module.scss";
import { CommWrapper } from "../../../assets/avila/CommWrapper";

export const AvilaSettings: React.FC<{}> = () => {
    const dispatch = useAppDispatch();
    const roomCreated = useAppSelector(selectAvilaRoomCreated);
    const isServerConnected = useAppSelector(selectAvilaIsServerConnnected);
    const [name, setName] = useState("");
    const [room, setRoom] = useState("");
    const [joinedRoom, setJoinedRoom] = useState("");

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

    return (
        <div className={styles.settingsWrapper}>
            <div>
                <div>
                    <label>Name</label>
                    <input
                        onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setName(e.target.value)
                        }
                        disabled={joinedOrCreatedRoom}
                    />
                    <IconButton
                        displayText="Create Room"
                        color={IconButtonColor.Green}
                        icon={solid("plus")}
                        disabled={
                            !isServerConnected ||
                            joinedOrCreatedRoom ||
                            name === ""
                        }
                        clickCallback={() => CommWrapper.CreateRoom(name)}
                    />
                </div>
                <div>
                    <label>Room</label>
                    <input
                        value={room}
                        onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setRoom(e.target.value)
                        }
                        disabled={joinedOrCreatedRoom}
                    />
                    <IconButton
                        displayText="Join Room"
                        color={IconButtonColor.Green}
                        icon={solid("door-open")}
                        clickCallback={() => {
                            CommWrapper.JoinRoom(room, name);
                            setJoinedRoom(room);
                        }}
                        disabled={
                            !isServerConnected ||
                            joinedOrCreatedRoom ||
                            name === "" ||
                            room === ""
                        }
                    />
                </div>
                {roomCreated && (
                    <IconButton
                        displayText="Start Game"
                        color={IconButtonColor.Green}
                        icon={solid("play")}
                        clickCallback={() => dispatch(startGame())}
                        disabled={false}
                    />
                )}
                {joinedRoom !== "" && <div>Waiting for host to start game</div>}
                {!isServerConnected && <div>Connecting to server...</div>}
            </div>
        </div>
    );
};
