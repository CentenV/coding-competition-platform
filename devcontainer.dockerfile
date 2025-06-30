FROM debian:12.11

RUN apt-get update -y && apt-get full-upgrade -y && \
    apt-get install curl -y

SHELL [ "/bin/bash", "-c" ]

WORKDIR /code/coding-competition-platform

RUN curl -fsSL https://get.pnpm.io/install.sh | ENV="$HOME/.bashrc" SHELL="$(which bash)" bash -

CMD [ "/bin/bash" ]
