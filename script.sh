sudo yum update -y

sudo amazon-linux-extras install docker

sudo service docker start

sudo systemctl enable docker

sudo groupadd docker

sudo usermod -aG docker ec2-user

sudo docker stop $(docker ps -aq)

sudo docker rm $(docker ps -aq)

sudo docker rmi $(docker images -q) -f

sudo docker run -d --name api-bbc-aws -p 80:80 --rm moisessouza/api-bbc-aws:latest