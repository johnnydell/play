@echo off
set PLAY_HOME=D:\play-2.2.6
set JAVA_HOME=D:\Program Files\Java\jdk1.7.0_79
set PATH=%JAVA_HOME%/bin;%JAVA_HOME%/jre/bin;%PLAY_HOME%;
set CLASSPATH=.;%JAVA_HOME%\lib\dt.jar;%JAVA_HOME%\lib\tools.jar; 
echo %PATH%
java -version
del RUNNING_PID
play "start -Dhttp.port=8080"
pause 