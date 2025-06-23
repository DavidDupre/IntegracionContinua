#!/bin/bash
# wait-for-it.sh

TIMEOUT=15
QUIET=0

while getopts "t:q" option; do
    case "$option" in
        t) TIMEOUT=$OPTARG ;;
        q) QUIET=1 ;;
    esac
done

shift $((OPTIND-1))

host=$1
port=$2

until nc -z $host $port; do
    if [[ $QUIET -eq 0 ]]; then
        echo "Esperando $host:$port..."
    fi
    sleep 1
    TIMEOUT=$((TIMEOUT-1))
    if [[ $TIMEOUT -eq 0 ]]; then
        if [[ $QUIET -eq 0 ]]; then
            echo "Timeout esperando $host:$port"
        fi
        exit 1
    fi
done

if [[ $QUIET -eq 0 ]]; then
    echo "$host:$port disponible!"
fi