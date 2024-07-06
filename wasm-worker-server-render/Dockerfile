# FROM ubuntu:latest
FROM rust:1-slim-buster

RUN apt-get update && apt-get install -y \
    curl \
    sudo \
    nodejs \
    npm \
    build-essential

# RUN curl https://sh.rustup.rs -sSf | sh -s -- -y
RUN curl -fsSL https://workers.wasmlabs.dev/install | bash

ENV PATH="/usr/local/bin:$PATH"

EXPOSE 8080

COPY ./app /app

CMD ["wws", "--host", "0.0.0.0", "--port", "8080", "./app"]
