import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
    IconButton,
    IconButtonColor,
} from "../../common/IconButton/IconButton";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import {
    playerJoinedRoom,
    selectAvilaRoomCreated,
    setRoomCreated,
    startGame,
} from "../../../features/avilaSlice";
import styles from "./AvilaSettings.module.scss";
import { CommWrapper } from "../../../assets/avila/CommWrapper";

export const AvilaSettings: React.FC<{}> = () => {
    const dispatch = useAppDispatch();
    const roomCreated = useAppSelector(selectAvilaRoomCreated);
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

    return (
        <div className={styles.settingsWrapper}>
            <div>
                <div>
                    <label>Name</label>
                    <input
                        onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setName(e.target.value)
                        }
                        disabled={roomCreated || joinedRoom !== ""}
                    />
                    <IconButton
                        displayText="Create Room"
                        color={IconButtonColor.Green}
                        icon={solid("plus")}
                        disabled={roomCreated || joinedRoom !== ""}
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
                        disabled={roomCreated || joinedRoom !== ""}
                    />
                    <IconButton
                        displayText="Join Room"
                        color={IconButtonColor.Green}
                        icon={solid("door-open")}
                        clickCallback={() => {
                            CommWrapper.JoinRoom(room, name);
                            setJoinedRoom(room);
                        }}
                        disabled={roomCreated || joinedRoom !== ""}
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
            </div>
        </div>
    );
};
