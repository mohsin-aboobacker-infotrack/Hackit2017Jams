- run the application from VS code- dotnet run
- Create an image from powershell  - docker build [pahthOFDockerFile] (i.e. D:\Github\iSupport\InfoTrack.iSupportMvc)
- Tag the docker image -  docker tag 4e2dbb1a8be2 docker.infotrack.com.au:5000/infotrackau-test/isupport-services:20170920
- Push the image to docker server -  docker push docker.infotrack.com.au:5000/infotrackau-test/isupport-services:20170920

