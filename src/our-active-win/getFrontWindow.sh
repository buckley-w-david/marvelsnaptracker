#!/bin/bash

# set -e

while true; do
    active_window_id=$(xdotool getactivewindow)
    if [ -z $active_window_id ]; then
        window_pid=-1
        X=-1
        Y=-1
        WIDTH=-1
        HEIGHT=-1
        title=""
    else
        title=$(xdotool getactivewindow getwindowname)
        window_pid=$(xdotool getwindowpid $active_window_id)
        eval $(xdotool getwindowgeometry --shell $active_window_id)
    fi

    owner_window_id=$(xdotool search --name '^SNAP$')
    if [ -z $owner_window_id ]; then
        owner_pid=-1
    else
        owner_pid=$(xdotool getwindowpid $owner_window_id)
    fi

    # It's not really useful to include active_window_id here, this is simply to mimic what snapHooker does
    json_output="{ \"id\": $active_window_id, \"bounds\": { \"x\": $X, \"y\": $Y, \"width\": $WIDTH, \"height\": $HEIGHT }, \"title\": \"$title\", \"owner\": { \"processId\": $owner_pid }, \"admin\": false, \"cantDoInjection\": false, \"platform\": \"linux\" }"

    echo $json_output
    sleep 1
done
