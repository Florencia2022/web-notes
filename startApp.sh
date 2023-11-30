#!/bin/bash

backend_dir="./backend"
frontend_dir="./frontend"

run_server() {
  cd "$1" 
  npm install
  npm start
}

run_server "$backend_dir" &

sleep 7

run_server "$frontend_dir" &

wait